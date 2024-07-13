import React, { useContext, useState } from "react";
import GGLogout from "./GGLogout";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import WishList from "../SileProfileBar/WishList";
import { WishlistContext } from "../SileProfileBar/WishlistContext";
import MyPassword from "../SileProfileBar/MyPassword";
import MyProfile from "../SileProfileBar/MyProfile";
import MyOrder from "../SileProfileBar/MyOrder";
import MyAddress from "../SileProfileBar/MyAddress";
import MyCollection from "../SileProfileBar/MyCollection";
import MySub from "../SileProfileBar/MySub";

export default function UserProfile() {
  const { userData } = useContext(UserContext);
  const storedOrder = localStorage.getItem("order");
  const order = storedOrder ? JSON.parse(storedOrder) : null;
  const [content, setContent] = useState("Overview");
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const profileLink = (title) => {
    return (
      <li
        onClick={() => setContent(`${title}`)}
        className={`text cursor-pointer inline-block`}
      >
        <div
          className={`inline-block pb-1 profile-link ${
            content === title ? "active" : "unactive"
          }`}
        >
          {title}
        </div>
      </li>
    );
  };

  if (!userData) {
    return (
      <div className="w-screen h-[80vh] flex justify-center items-center">
        <RingLoader size={100} color="#54cc26" />
      </div>
    );
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center mt-10">
      {/* Welcome */}
      <div className="relative w-[86%] h-[30vh] bg-black bg-opacity-5">
        <div className="flex flex-col justify-center items-center font-serif mt-10">
          <img
            src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-eternal-love-symbol-heart-infinity-sign-calligraphy-for-declarations-vector-png-image_37918768.png"
            alt=""
            className="w-1/5"
          />
          <div className="text uppercase text-[1.4em]">{`Welcome ${
            userData.given_name
              ? userData.given_name
              : userData.FirstName + " " + userData.LastName
          }`}</div>
          <div className="">Welcome to your account</div>
          <div className="">
            You can manage your shopping experience at Eternity Online Store.
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="relative w-full flex justify-center items-center">
        <div className="w-[86%] mt-16 flex justify-between">
          {/* Navlist */}
          <div className="w-1/4 h-[50vh]">
            <div className="text text-[1.4em] uppercase">My Eternity</div>
            <ul className="ml-5 mt-10 uppercase font-sans h-full flex flex-col justify-between">
              {profileLink("Overview")}
              {profileLink("my profile")}
              {profileLink("my password")}
              {profileLink("my orders")}
              {profileLink("My Wish List")}
              {profileLink("my addresses")}
              {profileLink("my collection")}
              {profileLink("my subscriptions & interests")}
              {/* Log out */}
              <GGLogout />
            </ul>
          </div>
          {/* Overview */}
          {content === "Overview" && (
            <div className="w-[72%] h-[73vh] grid grid-cols-2 font-serif">
              <div className="relative w-[95%] h-[95%] border-black border-[0.1em] border-opacity-30">
                <div className="absolute top-8 left-8 flex flex-col justify-between h-1/2">
                  <div className="text uppercase">My profile</div>
                  <div className="">
                    {userData.Gender ? "Mr. " : "Mrs. "}
                    {userData?.given_name
                      ? userData?.given_name
                      : userData?.FirstName + " " + userData?.LastName}
                  </div>
                  <div className="">
                    Email: {userData?.email || `${userData?.Email}`}
                  </div>

                  <div className="flex items-center">
                    <div className="">Rank:</div>
                    <div
                      style={{
                        backgroundImage: `url(${
                          userData?.Ranking === "Bronze"
                            ? "https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/1.png?v=9"
                            : userData?.Ranking === "Silver"
                            ? "https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=9"
                            : userData?.Ranking === "Gold"
                            ? "https://theglobalgaming.com/assets/images/article/Gold.webp"
                            : userData?.Ranking === "Diamond"
                            ? "https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=9"
                            : ""
                        })`,
                      }}
                      className="w-10 h-7 bg-cover bg-center"
                    ></div>
                    {userData.Ranking ? userData.Ranking : ""} (
                    {userData.DiscountRate * 100}% discount for all orders)
                  </div>
                </div>
              </div>
              <div className="relative w-[95%] h-[95%] border-black border-[0.1em] border-opacity-30">
                <div className="absolute top-8 w-full left-8 flex flex-col justify-between font-serif">
                  <div className="text uppercase mb-3">My order</div>
                  {/* Orders */}
                  {order && order.OrderID ? (
                    <div className="flex font-serif w-[55%] justify-between items-center mb-3">
                      <div
                        style={{
                          backgroundImage: `url(${order.products[0].Image})`,
                        }}
                        onClick={() => navigate(`/OrderDetails`)}
                        className="bg-black w-24 h-24 bg-cover cursor-pointer"
                      ></div>
                      <div className="">
                        <div className="">
                          <div className="">Order Number</div>
                          <div className="text uppercase">{order.OrderID}</div>
                        </div>
                        <div className="">
                          <div className="">Order Status</div>
                          <div className="text uppercase">Success</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-serif">Your shopping bag is empty</div>
                  )}

                  {/* View orders */}
                  <Link
                    to="/OrderDetails"
                    className={`font-serif ${
                      order && order.OrderID
                        ? "pointer-events-auto cursor-pointer title-link h-10 w-28"
                        : "pointer-events-none cursor-default"
                    }`}
                  >
                    {order && order.OrderID ? "View all order" : ""}
                  </Link>
                  <Link to="/OrderHistory" className="footer-link w-40 mt-2">
                    View purchase history
                  </Link>
                </div>
              </div>
              <div className="relative w-[95%] h-[95%] border-black border-[0.1em] border-opacity-30">
                <div className="absolute top-8 left-8 flex flex-col justify-between h-[25%]">
                  <div className="text uppercase mb-5">My wish list</div>
                  <div className="grid grid-cols-4 gap-2">
                    {wishlist.length > 0 ? (
                      wishlist.map((item, index) => (
                        <div key={index} className="">
                          <div
                            onClick={() =>
                              navigate(`/ProductPage/${item.productID}`)
                            }
                            style={{ backgroundImage: `url(${item.image})` }}
                            className="h-20 w-20 bg-cover bg-center rounded-lg cursor-pointer"
                          ></div>
                        </div>
                      ))
                    ) : (
                      <div className="absolute top-1/2 w-max text-center">
                        Your wish list is empty
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative w-[95%] h-[95%] border-black border-[0.1em] border-opacity-30">
                <div className="absolute top-8 left-8 flex flex-col justify-between h-1/4">
                  <div className="text uppercase">My addresses</div>
                  <div className="font-serif">
                    {userData.Address !== ""
                      ? userData.Address
                      : "You have not saved any addresses yet."}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Edit Profile */}
          {content === "my profile" && <MyProfile />}
          {/* Wish List */}
          {content === "My Wish List" && <WishList />}
          {/* Change Password */}
          {content === "my password" && <MyPassword />}
          {/* Orders */}
          {content === "my orders" && <MyOrder />}
          {/* Address */}
          {content === "my addresses" && <MyAddress />}
          {/* Collection */}
          {content === "my collection" && <MyCollection />}
          {/* Subcriptions */}
          {content === "my subscriptions & interests" && <MySub />}
        </div>
      </div>
    </div>
  );
}
