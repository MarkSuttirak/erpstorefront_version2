  import React from 'react';
  import { cookies } from 'next/headers'
  import Blog from './pages/blog/page';
  import LogButton from './component/loginButton';


  export default async function MyApp() {
    const token = cookies().get('token')
    if (token) {
      return <Blog></Blog>
    } else {
      return (    
        <LogButton></LogButton>
      );
    }
  }
