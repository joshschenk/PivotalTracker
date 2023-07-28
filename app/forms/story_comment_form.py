from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Comment

class StoryCommentForm(FlaskForm):
    story_id = IntegerField('story_id', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired()])
