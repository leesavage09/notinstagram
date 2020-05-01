import { post } from 'axios';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.fileUpload(this.state.file)
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  fileUpload(file) {
    const response = {
      "url": "https://s3.eu-west-2.amazonaws.com/notinstagram.public",
      "url_fields": {
        "key": "b616cd5b-3c79-4b86-9ce3-1f2c7db7f124",
        "success_action_status": "201",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAyMC0wNC0yMlQxOTo0Njo1NloiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJub3RpbnN0YWdyYW0ucHVibGljIn0seyJrZXkiOiJiNjE2Y2Q1Yi0zYzc5LTRiODYtOWNlMy0xZjJjN2RiN2YxMjQifSx7InN1Y2Nlc3NfYWN0aW9uX3N0YXR1cyI6IjIwMSJ9LFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDEsMjAwMDAwMF0seyJ4LWFtei1jcmVkZW50aWFsIjoiQUtJQVZIUVJYRDNLMzNCUkw1NU4vMjAyMDA0MjIvZXUtd2VzdC0yL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMjAwNDIyVDE5MzE1NloifV19",
        "x-amz-credential": "AKIAVHQRXD3K33BRL55N/20200422/eu-west-2/s3/aws4_request",
        "x-amz-algorithm": "AWS4-HMAC-SHA256",
        "x-amz-date": "20200422T193156Z",
        "x-amz-signature": "de0cd876abab39c3c7b7f7ae1df9a26bb4f8a65368e237f9f04e78f001245032"
      }
    }

    const url = response.url;
    const formData = new FormData();
    formData.append('key', response.url_fields['key'])
    formData.append('success_action_status', response.url_fields['success_action_status'])
    formData.append('policy', response.url_fields['policy'])
    formData.append('x-amz-credential', response.url_fields['x-amz-credential'])
    formData.append('x-amz-algorithm', response.url_fields['x-amz-algorithm'])
    formData.append('x-amz-date', response.url_fields['x-amz-date'])
    formData.append('x-amz-signature', response.url_fields['x-amz-signature'])
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    post(url, formData, config).then((response) => {
      console.log(response.data);
    }).catch(error => {
      console.log(error, error.response.data)
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    )
  }
}
