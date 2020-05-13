import axios from 'axios'

export function sendBlobToAmazonS3(blob, presignedData) {
    return new Promise((resolve, reject) => {
        const url = presignedData.url;
        const formData = new FormData();
        formData.append('key', presignedData.url_fields['key'])
        formData.append('Cache-Control', 'max-age=2592000')
        formData.append('acl', presignedData.url_fields['acl'])
        formData.append('success_action_status', presignedData.url_fields['success_action_status'])
        formData.append('policy', presignedData.url_fields['policy'])
        formData.append('x-amz-credential', presignedData.url_fields['x-amz-credential'])
        formData.append('x-amz-algorithm', presignedData.url_fields['x-amz-algorithm'])
        formData.append('x-amz-date', presignedData.url_fields['x-amz-date'])
        formData.append('x-amz-signature', presignedData.url_fields['x-amz-signature'])
        formData.append('file', blob)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(url, formData, config).then(() => {
            resolve(presignedData.url_fields['key'] + "?v=" + Math.round((new Date()).getTime() / 1000))
        }).catch((error) => {
            reject(error)
        })
    })
}