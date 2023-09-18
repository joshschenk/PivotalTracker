from app.models import db, User, environment, SCHEMA, Story
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stories():

    projects = Story(
        name ='Implement Projects', description='The user should be able to create projects', difficulty= 1, project_id=1,status='CURRENT', status_index= 0)

    stories = Story(
        name ='Implement Stories', description='The user should be able to create stories', difficulty= 1, project_id=1,status='CURRENT', status_index= 1)
    dnd = Story(
        name ='Implement DnD', description='The user should be able to move story between statuses', difficulty= 5, project_id=1,status='CURRENT', status_index= 2)
    comments = Story(
        name ='Implement Comments', description='The user should be able to create comments', difficulty= 1, project_id=1,status='BACKLOG', status_index= 0)
    chat = Story(
        name ='Implement Chat', description='The user should be able to chat in real time', difficulty= 1, project_id=1,status='BACKLOG', status_index= 1)

    createSpot = Story(
        name ='Create Spots', description='The user should be able to create spots', difficulty= 3, project_id=4,status='DONE', status_index= 0)
    createReviews = Story(
        name ='Create Reviews', description='The user should be able to create reviews', difficulty= 3, project_id=4,status='DONE', status_index= 1)
    aws = Story(
        name ='AWS hosting', description='Images should be hosted on AWS', difficulty= 3, project_id=4,status='BACKLOG', status_index= 0)

    createBookings = Story(
        name ='Create Bookings', description='The user should be able to create bookings', difficulty= 3, project_id=4,status='CURRENT', status_index= 0)

    search = Story(
        name ='Search', description='The user should be able to search for bookings', difficulty= 3, project_id=4,status='CURRENT', status_index= 0)


    transaction = Story(
        name ='Make Transaction', description='The user should be able to make a stock trnsaction', difficulty= 3, project_id=3,status='BACKLOG', status_index= 0)

    addBalance = Story(
        name ='Add Balance', description='The user should be able to add to their account balance', difficulty= 3, project_id=4,status='CURRENT', status_index= 1)

    charts = Story(
        name ='Charts', description='The user should be able to view financial charts', difficulty= 3, project_id=3,status='CURRENT', status_index= 2)

    searchStocks = Story(
        name ='Search Stocks', description='The user should be able to search for a given stock', difficulty= 3, project_id=3,status='DONE', status_index= 1)

    portfolio = Story(
        name ='Portfolio', description='The user should be able to view their portfolio', difficulty= 3, project_id=3,status='DONE', status_index= 0)

    wishlist = Story(
        name ='Create wishlist', description='The user should be able to create a wishlist', difficulty= 3, project_id=3,status='CURRENT', status_index= 0)

    db.session.add(projects)
    db.session.add(stories)
    db.session.add(dnd)
    db.session.add(chat)
    db.session.add(comments)
    db.session.add(createSpot)
    db.session.add(createBookings)
    db.session.add(createReviews)
    db.session.add(aws)
    db.session.add(search)
    db.session.add(wishlist)
    db.session.add(portfolio)
    db.session.add(searchStocks)
    db.session.add(charts)
    db.session.add(addBalance)
    db.session.add(transaction)

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
