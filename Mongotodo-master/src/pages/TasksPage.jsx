import React, { useEffect, useState } from 'react'
import { Button, Item, Header, Icon, Input, Label, Modal, Tab, Table, Grid, Search } from 'semantic-ui-react'
import TaskForm from '../components/TaskForm'
import moment from 'moment/moment'
import { deleteTask, getAllTasks, getAllTasksByKeyWord } from '../services'
import { useNavigate } from "react-router-dom";
import { isLogged } from "../services";




const options = [
  { key: 'todo', text: 'To do', value: 'todo' },
  { key: 'doing', text: 'Doing', value: 'doing' },
  { key: 'done', text: 'Done', value: 'done' },
]


export default function TasksPage() {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] })
  const [currentTask, setCurrentTask] = useState(null)


  const PanelComponent = ({ color, list }) => {
    return (
      <Tab.Pane>
        {list?.length > 0 ?
          <Table inverted color={color} key={color}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>Task</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Last modification</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list.map(x => <Table.Row>
                <Table.Cell textAlign='center'>{x.titre}</Table.Cell>
                <Table.Cell textAlign='center'>{moment(x.dateModification).fromNow()}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button content='Edit' icon='edit' labelPosition='left'
                    onClick={() => {
                      setCurrentTask(x)
                      setOpen(true)
                    }} />
                  <Button content='Delete' icon='delete' labelPosition='left'
                    onClick={async () => {
                      await deleteTask(x)
                      window.location.reload()
                    }} />
                </Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>
          :
          <Header as={"h2"} disabled textAlign='center'>No tasks</Header>}

      </Tab.Pane>
    )
  }

  const panes = [
    {
      menuItem: 'To do',
      render: () => <PanelComponent color={"red"} list={tasks.todo} />
    },
    {
      menuItem: 'Doing',
      render: () => <PanelComponent color={"yellow"} list={tasks.doing} />
    },
    {
      menuItem: 'Done',
      render: () => <PanelComponent color={"green"} list={tasks.done} />
    },
  ]

  const resultRenderer = ({ _id, titre, dateModification, statue, dateLimite, commentaire, sousTaches }) => {
    return (
      <Item as={Button} onClick={() => {
        setCurrentTask({
          "_id": _id,
          "titre": titre,
          "dateModification": dateModification,
          "statue": statue,
          "dateLimite": dateLimite,
          "commentaire": commentaire,
          "sousTaches": sousTaches,
        })
        setOpen(true)
      }}>
        <Item.Content verticalAlign='middle'>{titre}</Item.Content>
      </Item>
    )
  }

  useEffect(() => {
    const f=async ()=>{
      let tasks = await getAllTasks()
    setTasks({
      todo: tasks.filter(x => x.statue === "todo"),
      doing: tasks.filter(x => x.statue === "doing"),
      done: tasks.filter(x => x.statue === "done")
    })
    }

    f()
  }, [])
  return (<>

    <Modal
      dimmer={"blurring"}
      open={open}
      onClose={() => setOpen(true)}
    >
      <Modal.Header >Task details</Modal.Header>
      <Modal.Content>
        <TaskForm task={currentTask} />
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => {
          setCurrentTask(null)
          setOpen(false)
        }}>
          Cancel
        </Button>
        <Button positive onClick={() => {
          document.getElementById('formButton').click()
          setCurrentTask(null)
          setOpen(false)
        }}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>

    <Header as={"h1"} textAlign='center'>My tasks </Header>
    <br />

    <Grid centered>
      <Search
        loading={searchResults == null}
        size='huge'
        onSearchChange={async (e) => {
          setSearchResults(null)
          setSearchResults(await getAllTasksByKeyWord(e.target.value))
        }}
        resultRenderer={resultRenderer}
        results={searchResults}
      />
    </Grid>
    <br /><br />


    <Button floated='right' onClick={() => { setOpen(true) }}>
      <Icon name='plus' />
      Add new task
    </Button>
    <br /><br />
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  </>)
}