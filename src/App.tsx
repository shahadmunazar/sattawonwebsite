import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
import Navbar from "./components/Navbar";
// import LoginPage from "./auth/LoginPage";
// import RegisterPage from "./auth/RegisterPage";
// import About from "./pages/About";
// import Blog from "./pages/Blogs";
// import PlayGame from "./pages/PlayGame";
import Home from "./pages/Home";
import ChatBotWhatsApp from "./pages/ChatBotWhatsApp";
// import ChatBotTelegram from "./pages/ChatBotTelegram";
// import ProfilePage from "./auth/ProfilePage";
// import WalletPage from "./auth/WalletPage";
// import AddWhatsAppNumber from "./pages/AddWhatsAppNumber";
// import Transaction from "./pages/Transaction";
// import UserPlayGameHistory from "./pages/UserPlayGameHistory";
// import ChartPlayGameResult from "./pages/results/ChartPlayGameResult";
// import SubCategoryHandler from "./pages/Game/SubCategoryHandler";
// import Footer from "./components/Footer";
// import Contact from "./pages/Contact";
// import Support from "./pages/Support";
// import NewGameS from "./pages/newGame/NewGameS";
// import Game00to09 from "./pages/newGame/allgames/Game00to09";


const App: React.FC = () => {
  // const [categories, setCategories] = useState<{ category_name: string }[]>([]);

  // // Fetch categories for dynamic routes
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     // Check if categories exist in localStorage
  //     const storedCategories = localStorage.getItem('categories');
      
  //     if (storedCategories) {
  //       // If categories exist in localStorage, parse and use them
  //       setCategories(JSON.parse(storedCategories));
  //     } else {
  //       // If categories do not exist in localStorage, fetch them from the API
  //       try {
  //         const response = await axios.get(
  //           "https://liveapi.sattawon.com/api/sub-category-frontend"
  //         );
  //         const fetchedCategories = response.data.data; // Assuming data is in response.data.data
  //         setCategories(fetchedCategories);

  //         // Store the fetched categories in localStorage
  //         localStorage.setItem('categories', JSON.stringify(fetchedCategories));
  //       } catch (error) {
  //         console.error("Error fetching categories:", error);
  //       }
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Static Routes */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/playgame" element={<PlayGame />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/wallet" element={<WalletPage />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/support" element={<Support />} /> */}
          {/* <Route path="/play-game" element={<NewGameS/>}/> */}
          {/* <Route path="/new-game/:group" element={<Game00to09 />} /> */}

          
          {/* <Route path="/add-whats-app-message-numbers" element={<AddWhatsAppNumber />} /> */}
          {/* <Route path="/transactions" element={<Transaction />} /> */}
          {/* <Route path="/play-game-history" element={<UserPlayGameHistory />} /> */}
          {/* <Route
            path="/playGames/:encryptedCategoryId/:encryptedSubCategoryId/:encryptedCategoryName/:encryptedSubCategoryName"
            element={<SubCategoryHandler />}
          /> */}

          {/* Dynamic Routes based on categories */}
          {/* {categories.map((category) => (
  <Route
    key={category.category_name}
    path="/result/:category_name"
    element={<ChartPlayGameResult />}
  />
))} */}

        </Routes>
      </div>

      {/* WhatsApp and Telegram Chatbots */}
      <ChatBotWhatsApp />
      {/* <ChatBotTelegram /> */}

      {/* Footer */}
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
