from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import ProjectForm

project_routes = Blueprint('projects', __name__)




@project_routes.route('/')
@login_required
def get_projects():
    current_user_id = current_user.to_dict()["id"]
    projects = Project.query.filter_by(user_id = current_user_id).all()

    projects_to_dict = [p.to_dict() for p in projects]
    return {p["id"]:p for p in projects_to_dict}

@project_routes.route('/<int:id>')
@login_required
def get_project(id):

    project = Project.query.get(id)
    return project.to_dict()


@project_routes.route('/', methods=['POST'])
def new_project():

    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            name=form.data['name'],
            description=form.data['description'],
            user_id = current_user.to_dict()["id"]
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    print(form.errors)
    return {"errors":form.errors}, 401

@project_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_project(id):

    project_to_delete = Project.query.get(id)

    if project_to_delete:
        db.session.delete(project_to_delete)
        db.session.commit()
        return {"message": "successfully deleted"}

@project_routes.route("/update/<int:id>", methods=["PUT"])
def update_project(id):
    form = ProjectForm()


    form['csrf_token'].data = request.cookies['csrf_token']
    project_to_update = Project.query.get(id)

    if form.validate_on_submit():

        project_to_update.name = form.data["name"]
        project_to_update.description = form.data["description"]
        db.session.commit()
        return project_to_update.to_dict()
    print(form.errors)
    return {"errors":form.errors}, 401
