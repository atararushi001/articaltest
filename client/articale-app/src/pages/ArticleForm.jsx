import React, { useEffect, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, CloseButton } from 'react-bootstrap';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(selectedArticle ){
      try {
        const response = await  axios.put('http://localhost:3000/api/articles/'+selectedArticle.id, {
          title,
          content,
        });
  
        if (response.status === 201) {
          console.log('Article update successfully!');
       
        } else {
          console.error('Failed to update article:', response.data);
        }
      } catch (error) {
        console.error('Error creating article:', error);
      }
    }else{
    try {
      const response = await  axios.post('http://localhost:3000/api/articles/', {
        title,
        content,
      });

      if (response.status === 201) {
        console.log('Article created successfully!');
     
      } else {
        console.error('Failed to create article:', response.data);
      }
    } catch (error) {
      console.error('Error creating article:', error);
    }
  }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get('http://localhost:3000/api/articles');
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  // Custom upload adapter
  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('upload', file);

            axios
              .post('http://localhost:3000/api/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((response) => {
                resolve({
                  default: response.data.url,
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
      );
    }

    abort() {
      // Handle aborting the upload
    }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white  shadow-lg h-screen flex flex-col justify-between">
        <ul className="mt-10">
          {articles.map((article) => (
            <li
              key={article.id}
              className="bg-blue-100 text-blue-500 font-bold p-2 "
              onClick={() => setSelectedArticle(article)}
            >
              • {article.title}
            </li>
          ))}
        </ul>
        <Button
          className="mt-4 w-4/5 hover:bg-white-700 border-2 m-9 font-bold py-2 px-4 rounded-xl"
          onClick={() => {
            setSelectedArticle(null);
            setTitle('');
            setContent('');
          }}
        >
          + Add Article
        </Button>
      </div>

      {/* Main content */}
      <div className="w-3/4 bg-gray-100 p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              className='shadow appearance-none border border-black -500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              value={selectedArticle ? selectedArticle.title : title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={selectedArticle ? selectedArticle.content : content}
              onChange={(event, editor) => setContent(editor.getData())}
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              className='shadow h-screen appearance-none border border-black -500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ArticleForm;