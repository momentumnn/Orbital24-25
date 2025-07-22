import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginRegisterPage from "./Pages/LoginRegisterPage/LoginRegisterPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import SavedPage from "./Pages/SavedPage/SavedPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RestaurantDetailPage from './Pages/RestaurantDetailPage/RestaurantDetail';
import ForumPage from "./Pages/ForumPage/ForumPage";
import CreateThreadPage from "./Pages/ForumPage/CreateThreadPage/CreateThreadPage";
import ThreadDetailPage from "./Pages/ForumPage/ThreadDetailPage/ThreadDetailPage";


//protects the routes
//by redirecting the unlogged in users back to login page
//so that unlogged in people cannot manipulate the link to get into unlogged in pages
import Wrapper from "./Pages/Wrapper";

//navbar
import Header from "./Components/Header/Header";

//hides navbar when in login page or register page
import MaybeShowNavBar from "./Pages/MaybeShowNavBar";

function App() {
  return (
    <>
      <MaybeShowNavBar>
        <Header />
      </MaybeShowNavBar>

      <Routes>
        <Route path="/" element={<LoginRegisterPage />} />

        <Route path="/Login" element={<LoginPage />} />

        <Route path="/Register" element={<RegisterPage />} />

        <Route
          path="/Home"
          element={
            <Wrapper>
              <HomePage />
            </Wrapper>
          }
        />
        <Route path="/Home/:id" element={
          <Wrapper>
            <RestaurantDetailPage />
          </Wrapper>
        } />

        <Route
          path="/Saved"
          element={
            <Wrapper>
              <SavedPage />
            </Wrapper>
          }
        />

        <Route path="/Saved/:id" element={
          <Wrapper>
            <RestaurantDetailPage />
          </Wrapper>
          } />

        <Route
          path="/Search"
          element={
            <Wrapper>
              <SearchPage />
            </Wrapper>
          }
        />

        <Route
          path="/Profile"
          element={
            <Wrapper>
              <ProfilePage />
            </Wrapper>
          }
        />
        <Route path="/Forum" element={
          <Wrapper>
            <ForumPage />
          </Wrapper>

        } />

        <Route path="/Forum/Create" element={
          <Wrapper>
            <CreateThreadPage />
          </Wrapper>
        } />


        <Route path="/Forum/Thread/:id" element={
          <Wrapper>
            <ThreadDetailPage />
          </Wrapper>
        } />
      </Routes>
    </>
  );
}

export default App;
