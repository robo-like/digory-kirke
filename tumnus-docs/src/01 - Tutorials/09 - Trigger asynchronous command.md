
# Introduction
When you got to programatically send an email, you don't want to just assume that it went through okay, right? You want to make it so that you know if there was a connection error, or a settings problem, and outage, etc.

But, you want to remove / decouple the sending from your primary thread / process because this increases retry-ability in a way that would get very dense among other core functionality of your API.

The goal for Tumnus' approach to this pulls from it's category of messages called, "tasks". Tasks are the things that you need to happen at a specific time. That means that tasks will not be auto deleted or cleaned up per a standard log rotation policy.

Where this is handy for your other messages (assuming you've cleaned up and procesed through all history records given the 30, 60, 90 day schedule) to drop off and don't build up and polute our servers with unneeded data (and thus saving our planet, but we're not counting 🙈).

In this example will be creating a task with the Tumnus SDK with the preset of NOW() which we can then leverage the options `{waitForComplete:true}`.

> | **This would be a neat place to consider adding some reactivity to the Tumnus SDK. For example, is there a callback system that would be helpful to link into and subscribe to additional lifecycle events? If you're up for it, feel free to contribute by opening a PR today!**

We will have to name our Parent Task. It's the collection that arbitrates whether a task can be added or not. If you create (or try to) a Task Message without having a referencial parent, it will not be created.

- [ ]

# Based Example

## Create the Task Parent
This is like a placeholder; it ensures the necessary collections are there and enables downstream producers to create the tasks associated to the parent tasks' names.

```typescript
//create-task-parent.ts
import Tumnus from 'tumnus';
const {taskParent} = new Tumnus('mongo_uri');

async function main(){
  try {
    await taskParent.create({
      name: "SendEmail"
    });
    console.log("Task parent created successfully.");
  }
  catch (error) {
    console.error("Failed to create task parent:", error);
  }
}
main();
//$: run create-task-parent.ts
```

##  Listen for tasks to respond to
```typescript
//respond-to-task.ts
import Tumnus from 'tumnus';
import type { Task } from 'tumnus';
const {tasks} = new Tumnus('mongo_uri');

async function respond_to_task(task:Task){
    //  fill in this logic
    setTimeout(()=>{
        if (Math.random() < 0.4){
            return task.send({status:'failed', payload:{error:"1/4 chance of this account failing."}})
        }
        task.send({status:'success'})
    }, 500);
}
// we have the benefit of being able to trust that no matter how many
// responder threads we have open, we will by default be able to trust
// that we only receive these events once.
function main(){
    tasks.parent('SendEmail').on('created', respond_to_task);
}
main();

//$: run respond-to-task.ts
```

## Create a new task message and wait for complete state
```typescript
//main.ts

import Tumnus from 'tumnus';

const {tasks} = new Tumnus('mongo_uri');
import type { Task } from 'tumnus';

async function main(){
    const task = new Task('SendEmail');
    const result = await task.send({
        to: 'contact@organization.com',
        body: '<div>Hello world!</div>'
    }, {waitForComplete:true})

    console.log(result);
    process.exit(0)
}

try{
    main();
}
catch(err){
    // there should be two levels of errors here
    // 1. tumnus can fail; but in future iterations, where we're wiring directly into a usecase, you may want to insert a wrapper that auto-catches these errors to log to your logging platform as a backup
    // 2. the error response from the Tumnus Task. For example, the email fails to send for a dynamic set of reasons.
    process.exit(1)
}

//$: run main.ts

```

# Concluding Thoughts

And that's how we tell something to take care of something asynchronously while not blocking our main thread and responding therafter as to when this message has been processed successfully (or fails miserably, whichever comes first).
