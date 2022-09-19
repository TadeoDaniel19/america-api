const buildResponse = (type, code, message, results) => {
    let response = {
      type, 
      code,
      message,
    }
    if (type === 'Success' && code === 200) {
      response = {
        type,
        code, 
        message,
        data: results,
      }
    } 
    return response;
  }

module.exports = {
  buildResponse
}