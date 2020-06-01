import styled from "styled-components";

export const NavWrapper = styled.div`
  background-color: #107a8b;
  font-family: "Poppins", sans-serif;
  form {
    background-color: #fff;
    margin-left: 40px;
    height: 45px;
    padding: 0 20px;
    border-radius: 100px;
    input {
      font-size: 15px;
      border: none;
      background: white;
      margin: 0 0 0 5px;
    }
    input:focus {
      box-shadow: none;
    }
  }
  .form-inline {
    flex-flow: unset;
  }
  .nav-link {
    color: #fff;
    margin-left: 20px;
  }
  .navbar-light .navbar-nav .nav-link {
    color: #fff;
    margin-left: 20px;
  }
  .navbar-light .navbar-nav .nav-link:hover {
    color: #00d1ff;
  }
  .img {
    height: 32px;
  }
  .nav-item .login {
    background-color: black;
  }
  .dropdown-toggle:after {
    content: none;
  }
  .dropdown-item.active,
  .dropdown-item:active {
    background-color: #fff;
    color: #000;
  }
  .dropdown-item.active,
  .dropdown-item:hover {
    color: #028090;
  }
`;
