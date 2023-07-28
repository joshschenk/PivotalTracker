from .db import db, environment, SCHEMA, add_prefix_for_prod
from .users_projects import users_projects

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    stories = db.relationship("Story", back_populates="project", cascade="all, delete-orphan")
    users = db.relationship("User", secondary=users_projects, back_populates="projects")
    comments = db.relationship("Comment", back_populates="project", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'stories': [story.to_dict() for story in self.stories],
            'comments': [comment.to_dict() for comment in self.comments]

        }

    def to_dict_with_users(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'stories': [story.to_dict() for story in self.stories],
            'users': [user.to_dict() for user in self.users]
        }
