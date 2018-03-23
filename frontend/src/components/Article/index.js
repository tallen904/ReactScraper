import React from 'react';
import './styles.css'
import {Button, Modal} from 'react-materialize'
import ArticleComments from '../ArticleComments'

const Article = ({title, link, notes}) => {
    console.log(notes)
    const comments = notes.map(note => {
        return <ArticleComments 
                key={note._id}
                {...note}
                />
    })
    return <div>
        <div>
          <h5>{title}</h5>
          <p>{link}</p>
          <Modal header="Modal Header" trigger={<Button>MODAL</Button>}>
            <ul>
                <li>{notes}</li>
            </ul>
          </Modal>
        </div>
      </div>;
};

export default Article;