export const postRequest = async (url: string, params: any): Promise<any> => {
  const domain = 'http://localhost:5000';

  try {
    const response = await fetch(`${domain}/${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return response.json();
    // const { data } = await authRequest.post(`${domain}/${url}`, params);

    // console.log('postRequest', response);

    // return response;
  } catch (error) {
    console.log(error);
  }
};
