from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import ProjectForm

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
@login_required
def get_projects():
    """
    Query for all users and returns them in a list of user dictionaries
    """

    current_user_id = current_user.to_dict()["id"]
    projects = Project.query.all()
    projects_to_dict = [p.to_dict() for p in projects]
    return {p["id"]:p for p in projects_to_dict}


@project_routes.route('/', methods=['POST'])
def new_project():

    print("GETS TO ROUTE???")

    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            name=form.data['name'],
            description=form.data['description'],
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
