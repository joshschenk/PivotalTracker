from .db import db, environment, SCHEMA, add_prefix_for_prod
from .users_projects import users_projects

class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable = False)
    difficulty = db.Column(db.Integer, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))

    project = db.relationship("Project",  back_populates="stories")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'difficulty': self.difficulty,
            'project_id': self.project_id
        }

    def to_dict_with_project(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'difficulty': self.difficulty,
            'project_id': self.project_id,
            'project': self.project.to_dict()
        }
