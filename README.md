# Trivial Tracker

## Table of Contents
* [ About ](#about)
* [ Technologies ](#tech)
* [ Features ](#feat)
* [ Code Snippets](#code)

<a name="about"></a>
## About

Robust project management tool capable of creating stories, managing task priority, and providing comentation on progress.

<a name="tech"></a>
## Technologies

Javascript, Python, HTML, CSS, React, Redux, Flask, SQLAlchemy, BeautifulDND.js, Validator.js

<a name="feat"></a>
## Features
### Add a story

![image](https://github.com/joshschenk/PivotalTracker/assets/35519689/7f7dae27-50d6-427d-bc10-f406558ef985)

### Comment on a story

![image](https://github.com/joshschenk/PivotalTracker/assets/35519689/e11e81f8-edfa-4c66-895b-a6fd2101617b)

### Drag and drop story into new phase of development

![image](https://github.com/joshschenk/PivotalTracker/assets/35519689/6b039a06-297e-41f1-85ee-67668671ffe8)


<a name="code"></a>
## Code Snippets
### Drag and Drop Functionality 
```javascript
const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (!(source.droppableId === destination.droppableId && destination.index === source.index))
        {
            if (destination.droppableId === '1') {
                dispatch(updateStatusThunk({ status_index: parseInt(destination.index), status: "CURRENT", source: parseInt(source.droppableId), source_index: source.index }, draggableId))

            }
            else if (destination.droppableId === '2')
                dispatch(updateStatusThunk({ status_index: parseInt(destination.index), status: "BACKLOG", source: parseInt(source.droppableId), source_index: source.index }, draggableId))
            else if (destination.droppableId === '3')
                dispatch(updateStatusThunk({ status_index: parseInt(destination.index), status: "DONE", source: parseInt(source.droppableId), source_index: source.index }, draggableId))
        }
        if (source.droppableId !== destination.droppableId) {


            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);


            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else if (source.droppableId === destination.droppableId && destination.index !== source.index) {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);


            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };
```

### Backend Route for Story's Progress Update

```python
@story_routes.route("/status/<int:id>", methods=["PUT"])
def update_status(id):

    form = StatusForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    story_to_update = Story.query.get(id)
    if form.validate_on_submit():
        story_to_update.status = form.data["status"]
        story_to_update.status_index = form.data["status_index"]

        db.session.commit()

        stories = Story.query.filter(and_(Story.project_id == story_to_update.project_id, Story.id != id, Story.status_index >= story_to_update.status_index, Story.status == story_to_update.status)).all()
        for s in stories:
            s.status_index = s.status_index + 1

            source = ""
            if form.data["source"] == 1:
                source = "CURRENT"
            elif form.data["source"] == 2:
                source = "BACKLOG"
            elif form.data["source"] == 3:
                source = "DONE"

            if source != form.data["status"]:
                old_stories = Story.query.filter(and_(Story.project_id == story_to_update.project_id, Story.status_index >= form.data["source_index"], Story.status == source)).all()
                for s in old_stories:
                    s.status_index = s.status_index - 1

            db.session.commit()

        allstories = Story.query.all()
        for s in allstories:

        return story_to_update.to_dict()
    return {"errors":form.errors}, 401
```





