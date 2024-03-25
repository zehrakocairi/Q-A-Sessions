import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PageContent from "./components/PageContent/PageContent";
import Home from "./pages/Home/Home";
import ModulePage from "./pages/ModulePage/ModulePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LoginPage/LoginPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage/QuestionDetailsPage";
import PostQuestionPage from "./pages/PostQuestionPage/PostQuestionPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import UserQuestionsPage from "./pages/UserQuestionsPage/UserQuestionsPage";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <>
          <Header />
          <Sidebar />
          <PageContent className="overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Modules routes */}
              <Route path="/html" element={<ModulePage moduleName="HTML" />} />
              <Route path="/css" element={<ModulePage moduleName="CSS" />} />
              <Route path="/cli-git" element={<ModulePage moduleName="CLI | GIT" />} />
              <Route path="/javascript" element={<ModulePage moduleName="JavaScript" />} />
              <Route path="/browsers" element={<ModulePage moduleName="Browsers" />} />
              <Route path="/using-apis" element={<ModulePage moduleName="Using APIs" />} />
              <Route path="/nodejs" element={<ModulePage moduleName="Node.js" />} />
              <Route path="/databases" element={<ModulePage moduleName="Databases" />} />
              <Route path="/react" element={<ModulePage moduleName="React" />} />

              {/* Authentication routes */}
              <Route path="/auth/sign-up" element={<SignUpPage />} />
              <Route path="/auth/log-in" element={<LogInPage />} />

              {/* User routes */}
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/user-profile/my-questions" element={<UserQuestionsPage />} />

              {/* Question routes */}
              <Route path="/post-question" element={<PostQuestionPage />} />
              <Route path="/questions/:id" element={<QuestionDetailsPage />} />
            </Routes>
          </PageContent>
        </>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
