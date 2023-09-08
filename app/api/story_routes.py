from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Story, db, Project, Comment
from app.forms import StoryForm, StatusForm
from sqlalchemy import and_

story_routes = Blueprint('stories', __name__)

@story_routes.route('/story/<int:id>')
def get_story(id):
    story = Story.query.filter_by(story_id = id)
    return story.to_dict()

@story_routes.route('/<int:id>')
@login_required
def get_stories(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    current_user_id = current_user.to_dict()["id"]
    stories = Story.query.filter_by(project_id = id).all()
    stories_to_dict = [s.to_dict() for s in stories]
    return {s["id"]:s for s in stories_to_dict}



@story_routes.route('/', methods=["POST"])
def new_story():

    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        story = Story(
            name=form.data['name'],
            description=form.data['description'],
            difficulty=form.data['difficulty'],
            project_id=form.data['project_id'],
            status= 'BACKLOG'

        )
        db.session.add(story)
        db.session.commit()
        return story.to_dict()
    return {"errors":form.errors}, 401

@story_routes.route('/<int:id>', methods=['DELETE'])
def delete_story(id):
    story_to_delete = Story.query.get(id)

    if story_to_delete:
        db.session.delete(story_to_delete)
        db.session.commit()
        return {"message": "successfully deleted"}


@story_routes.route("/update/<int:id>", methods=["PUT"])
def update_story(id):
    form = StoryForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    story_to_update = Story.query.get(id)
    print(form.data["project_id"])
    if form.validate_on_submit():
        story_to_update = Story.query.get(id)
        story_to_update.name = form.data["name"]
        story_to_update.difficulty = form.data["difficulty"]
        story_to_update.description = form.data["description"]
        story_to_update.project_id = form.data["project_id"]

        db.session.commit()
        return story_to_update.to_dict()
    return {"errors":form.errors}, 401

@story_routes.route("/status/<int:id>", methods=["PUT"])
def update_status(id):

    form = StatusForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    story_to_update = Story.query.get(id)
    if form.validate_on_submit():
        story_to_update.status = form.data["status"]
        story_to_update.status_index = form.data["status_index"]

        db.session.commit()

        stories = Story.query.filter(and_(Story.project_id == story_to_update.project_id, Story.id != id, Story.status_index >= story_to_update.status_index, Story.status == story_to_update.status)).all()
        print("***************")
        for s in stories:
            s.status_index = s.status_index + 1
            print(s.name, s.status_index)

            source = ""
            if form.data["source"] == 1:
                source = "CURRENT"
            elif form.data["source"] == 2:
                source = "BACKLOG"
            elif form.data["source"] == 3:
                source = "DONE"

            print("__________________")

            if source != form.data["status"]:
                old_stories = Story.query.filter(and_(Story.project_id == story_to_update.project_id, Story.status_index >= form.data["source_index"], Story.status == source)).all()
                for s in old_stories:
                    s.status_index = s.status_index - 1
                    print(s.name, s.status_index)

            db.session.commit()

        allstories = Story.query.all()
        print("________________")
        for s in allstories:
            print(s.name, s.status, s.status_index)

        return story_to_update.to_dict()
    print(form.errors)
    return {"errors":form.errors}, 401
