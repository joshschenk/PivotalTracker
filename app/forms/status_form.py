from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, InputRequired
from app.models import Story

class StatusForm(FlaskForm):
    status= StringField('status', validators=[DataRequired()])
    status_index = IntegerField('status_index')
    source = IntegerField('source')
    source_index = IntegerField("source_index")
