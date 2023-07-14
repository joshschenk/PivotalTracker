from sqlalchemy.schema import Table
from .db import db, add_prefix_for_prod, environment, SCHEMA

users_projects = Table(
    "users_projects",
    db.Model.metadata,
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("project_id", db.ForeignKey(add_prefix_for_prod("projects.id")), primary_key=True))


if environment == "production":
       users_projects.schema = SCHEMA
