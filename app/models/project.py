from .db import db, environment, SCHEMA
from .users_projects import users_projects

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable = False)

    stories = db.relationship("Story", back_populates="project")
    users = db.relationship("User", secondary=users_projects, back_populates="projects")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'stories': [story.to_dict() for story in self.stories],
            'users': [user.to_dict() for user in self.users]
        }
