from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Story

class StoryForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    difficulty = StringField('difficulty', validators=[DataRequired()])
    project_id = IntegerField('project_id', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    status_index = IntegerField('status_index')
