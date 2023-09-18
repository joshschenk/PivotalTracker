from app.models import db, User, environment, SCHEMA, Project
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_projects(users):
    capstone = Project(
        name ='Capstone', description='Final Project', user_id = 1, users= [users[0], users[1]])

    group = Project(
        name ='Group', description='Group Project', user_id = 3, users= [users[0], users[2]])


    webear = Project(
        name ='Webear', description='Financial trading site', user_id = 1, users= [users[0], users[1]])


    airbnb  = Project(
        name ='Airbnb', description='Airbnb Clone', user_id = 1, users= [users[0], users[1]])

    db.session.add(capstone)
    db.session.add(group)
    db.session.add(webear)
    db.session.add(airbnb)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
