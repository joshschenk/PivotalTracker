from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Story, db
from app.forms import StoryForm

story_routes = Blueprint('stories', __name__)


@story_routes.route('/')
@login_required
def get_stories():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    current_user_id = current_user.to_dict()["id"]
    stories = Story.query.all()
    stories_to_dict = [s.to_dict() for s in stories]
    return {s["id"]:s for s in stories_to_dict}


@story_routes.route('/', methods=["POST"])
def new_story():

    print("GETS TO ROUTE")
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("GETS PAST SUBmit")
    if form.validate_on_submit():

        story = Story(
            name=form.data['name'],
            description=form.data['description'],
            difficulty=form.data['difficulty'],
            project_id=form.data['project_id']

        )
        db.session.add(story)
        db.session.commit()
        return story.to_dict()
