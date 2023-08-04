from app.models import db, User, environment, SCHEMA, Story
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stories():

    projects = Story(
        name ='Implement Projects', description='The user should be able to create projects', difficulty= 1, project_id=1,status='CURRENT')

    stories = Story(
        name ='Implement Stories', description='The user should be able to create stories', difficulty= 1, project_id=1,status='CURRENT')
    dnd = Story(
        name ='Implement DnD', description='The user should be able to move story between statuses', difficulty= 5, project_id=1,status='CURRENT')
    comments = Story(
        name ='Implement Comments', description='The user should be able to create comments', difficulty= 1, project_id=1,status='BACKLOG')
    chat = Story(
        name ='Implement Chat', description='The user should be able to chat in real time', difficulty= 1, project_id=1,status='BACKLOG')

    createSpot = Story(
        name ='Create Spots', description='The user should be able to create spots', difficulty= 3, project_id=2,status='BACKLOG')


    db.session.add(projects)
    db.session.add(stories)
    db.session.add(dnd)
    db.session.add(chat)
    db.session.add(comments)
    db.session.add(createSpot)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))

    db.session.commit()
