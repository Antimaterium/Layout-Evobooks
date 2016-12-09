import React, {Component} from 'react';
import InputImage from './InputImage';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {request} from '../utils/Request';
import {browserHistory} from 'react-router';

const styles = {
    paper: {
        height: '100%',
        width: '97%',
        margin: 20,
        marginTop: '100px',
        paddingBottom: 50,
        textAlign: 'center',
        display: 'inline-block',
        backgroundColor: '#FAFAFA',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

class CadastroImagem extends Component {

state = {
    imageName: '',
    categories: []
}

sendFile(){


 
var header = {
    "Authorization": "Bearer "+localStorage.getItem("token"),
    "Content-Type": "multipart/form-data"
}


var formData = new FormData();
console.log(this.state.value);

formData.append('filename', this.refs.image.state.image.name);
formData.append('description', this.state.description);
formData.append('tags', this.state.tags);
formData.append('categoryId', this.state.value);
formData.append('file', this.refs.image.state.image);

console.log(formData);
  var xhr = new XMLHttpRequest();


 xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.status == 200){
            alert("A imagem foi cadastrada na sua biblioteca!");
               browserHistory.push('/home');
        }
        else{
            console.log(xhr);
            alert("Houve um erro durante o cadastro da imagem - Seu arquivo FBX deve estar no formato ASCII e deve ser válido");
            
        }
    }
}
 xhr.open('POST', 'http://localhost:63367/File/Novo'); 

 //xhr.open('POST', 'File/Novo');
 console.log('c');

 xhr.setRequestHeader('Authorization',`Bearer ${localStorage.getItem('token')}`);

 xhr.send(formData);
   
// request("POST","File/Novo", header, formData)
//     .then(response => response.json())
//     .then(response => {
//         console.log(response)
//     })
     // request("File/Novo", "POST", header, formData)
     //  .then(response => response.json())
     //  .then(response => {
     //  localStorage.setItem('token', response.access_token)
     //  console.log(response.userName)
     //   localStorage.setItem('userName', response.userName)
     //  })

        
}


  componentDidMount(){
     var header = {"Content-Type":"application/json"};
        var body = {};


    request("File/Categories","Get", header, body)
      .then(response => 
        response.json()
      )
      .then(response => {
        var arr = response.map((x,i, a)=> {
            return <MenuItem value={x.Id} key={i} primaryText={x.Name} /> 
        });
        console.log("Passou");
        console.log(arr);
         this.setState({categories: arr});
        //console.log(categories);
       
      })
      .catch(error=> {
        
      });
}

handleChange = (event, index, value) => {
    this.setState({value});
    console.log(this.state.value);
  };
 render() {

    
     
      return( 
        <div>
            <Paper 
                style={styles.paper} 
                zDepth={1} 
                children={
                <div>
                    <form id="formImage">

                        <InputImage ref="image" 
                            onChange={file => this.setState({imageName: file.name})} />
                     
                        <TextField 
                            disabled={true}
                            value={this.state.imageName}
                            name="filename"
                            style={{width: '30%'}}
                            hintText="Digite um Nome"
                            floatingLabelText="Nome da Imagem"
                        /><br />

                        <TextField
                            onChange={e => this.setState({description: e.target.value})}
                            name="description"
                            style={{width: '30%'}}
                            hintText="Digite uma Descrição"
                            floatingLabelText="Descrição"
                        /><br />
                         
                         
                        <SelectField
                            floatingLabelText="Categoria"
                            value={this.state.value}
                            onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {this.state.categories}
                        </SelectField>
                        <br />

                            <TextField
                            onChange={e => this.setState({tags: e.target.value})}
                            name="tags"
                            style={{width: '30%'}}
                            hintText="Digite tags (Ex:tag1,tag2)"
                            floatingLabelText="Tags"
                        />
                        <br />
                        
                        <div style={styles.buttons}>
                        <RaisedButton 
                            label="Salvar" 
                            primary={true} 
                            onClick={this.sendFile.bind(this)} />
                        </div>
                    </form>
                </div>
                }
            />
        </div>
     );
 }
    
}

export default CadastroImagem;
