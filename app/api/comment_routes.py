from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db, Comment
from app.forms import StoryCommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/story/<int:id>')
def get_story_comments(id):
    comments = Comment.query.filter_by(story_id = id).all()

    comments_to_dict = [c.to_dict() for c in comments]
    return {c["id"]:c for c in comments_to_dict}

@comment_routes.route('/project/<int:id>')
def get_project_comments(id):
    comments = Comment.query.filter_by(project_id = id).all()

    comments_to_dict = [c.to_dict() for c in comments]
    return {c["id"]:c for c in comments_to_dict}

@comment_routes.route('/story', methods=["POST"])
def new_story_comment():

    print("GETS TO COMMENT ROUTE")

    form = StoryCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        comment = Comment(
            story_id= form.data['story_id'],
            message= form.data['message'],
            user_id=  current_user.to_dict()["id"]

        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {"errors":form.errors}, 401
