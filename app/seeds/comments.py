from app.models import db, User, environment, SCHEMA, Story, Comment
from sqlalchemy.sql import text

def seed_comments():

    createProjectStyling = Comment (
        story_id = 1, user_id = 1, message = 'new project form could use styling'
    )

    createProjectStyling2 = Comment (
        story_id = 1, user_id = 2, message = 'lets focus on functionality for now'
    )

    db.session.add(createProjectStyling)

    db.session.add(createProjectStyling2)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
