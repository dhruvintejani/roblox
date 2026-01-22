import type { ChatUser, Messages, Plan } from "../../../features/notio/interface/IHome";
import type { Reel } from "../../../features/notio/interface/IShorts";
import image_1 from "../../images/Notio/n-1.jpg";
import image_2 from "../../images/Notio/n-2.jpg";
import image_3 from "../../images/Notio/n-3.jpg";
import image_4 from "../../images/Notio/n-4.jpg";
import image_5 from "../../images/Notio/n-5.jpg";
import image_6 from "../../images/Notio/n-6.jpg";
import image_7 from "../../images/Notio/n-7.jpg";
import image_8 from "../../images/Notio/n-8.jpg";
import image_9 from "../../images/Notio/n-9.jpg";
import image_10 from "../../images/Notio/n-10.jpg";

export const mockReels: Reel[] = [
  {
    id: "1",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Feeling the wind in my hair during this amazing ride! 🏍️",
    likes: 12500,
    comments: 342,
    shares: 189,
    music: "Upbeat Adventure - Original",
    duration: 15,
    user: {
      id: "user1",
      username: "adventure_seeker",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: false,
      followers: 12400,
      bio: "Chasing adventures around the globe 🌍",
    },
    isLiked: false,
    isSaved: false,
    timestamp: "2 hours ago",
    category: "Adventure",
    tags: ["adventure", "travel", "motorcycle", "roadtrip"],
    views: 45000,
    location: "California Coast",
    relatedReels: ["2", "3"],
  },
  {
    id: "2",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Weekend vibes with friends! Always better together 👫",
    likes: 8900,
    comments: 210,
    shares: 95,
    music: "Chill Vibes - Lo-fi Mix",
    duration: 12,
    user: {
      id: "user2",
      username: "urban_explorer",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: true,
      followers: 8900,
      bio: "Exploring city life one street at a time",
    },
    isLiked: true,
    isSaved: true,
    timestamp: "1 day ago",
    category: "Lifestyle",
    tags: ["friends", "fun", "weekend", "urban"],
    views: 32000,
    location: "New York City",
    relatedReels: ["1", "4"],
  },
  {
    id: "3",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Street skating sesh with the crew! 🛹",
    likes: 25400,
    comments: 890,
    shares: 456,
    music: "Skate Punk Rock - Original",
    duration: 18,
    user: {
      id: "user3",
      username: "skate_legend",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: false,
      followers: 21500,
      bio: "Skateboarder | Content Creator",
    },
    isLiked: false,
    isSaved: false,
    timestamp: "3 hours ago",
    category: "Sports",
    tags: ["skateboarding", "sports", "action", "street"],
    views: 125000,
    location: "Los Angeles Skatepark",
    relatedReels: ["1", "4"],
  },
  {
    id: "4",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Homemade pasta from scratch using my grandma's recipe! 🍝",
    likes: 15600,
    comments: 432,
    shares: 267,
    music: "Italian Cooking Sounds",
    duration: 20,
    user: {
      id: "user4",
      username: "chef_life",
      avatar:
        "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: false,
      followers: 15600,
      bio: "Professional Chef | Food Content Creator",
    },
    isLiked: false,
    isSaved: true,
    timestamp: "5 days ago",
    category: "Food",
    tags: ["cooking", "food", "recipe", "italian"],
    views: 89000,
    location: "Rome, Italy",
    relatedReels: ["2", "3"],
  },
  {
    id: "5",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Morning workout routine to start the day right! 💪",
    likes: 23400,
    comments: 650,
    shares: 345,
    music: "Workout Motivation Mix",
    duration: 22,
    user: {
      id: "user5",
      username: "fitness_guru",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: true,
      followers: 18900,
      bio: "Fitness Coach | Helping people transform",
    },
    isLiked: true,
    isSaved: true,
    timestamp: "1 week ago",
    category: "Fitness",
    tags: ["fitness", "workout", "gym", "motivation"],
    views: 156000,
    location: "Gold's Gym",
    relatedReels: ["2", "3"],
  },
  {
    id: "6",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Creative coding session - building something amazing! 💻",
    likes: 8900,
    comments: 230,
    shares: 145,
    music: "Coding Focus - Ambient Mix",
    duration: 25,
    user: {
      id: "user6",
      username: "tech_wizard",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005-128b-e5e8d3be5d2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: false,
      followers: 7600,
      bio: "Full Stack Developer | Tech Enthusiast",
    },
    isLiked: false,
    isSaved: false,
    timestamp: "2 days ago",
    category: "Tech",
    tags: ["coding", "tech", "programming", "developer"],
    views: 45000,
    location: "San Francisco",
    relatedReels: ["2", "5"],
  },

  {
    id: "7",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Nature at its finest! 🌿",
    likes: 18700,
    comments: 540,
    shares: 290,
    music: "Forest Sounds - Nature",
    duration: 30,
    user: {
      id: "user7",
      username: "nature_lover",
      avatar:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: false,
      followers: 14200,
      bio: "Wildlife Photographer | Nature Conservationist",
    },
    isLiked: true,
    isSaved: true,
    timestamp: "3 days ago",
    category: "Nature",
    tags: ["nature", "wildlife", "photography", "outdoors"],
    views: 98000,
    location: "Yellowstone National Park",
    relatedReels: ["1", "4"],
  },
  {
    id: "8",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Music festival memories! 🎵",
    likes: 32100,
    comments: 1200,
    shares: 650,
    music: "Festival EDM Mix",
    duration: 18,
    user: {
      id: "user8",
      username: "festival_goer",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isFollowing: true,
      followers: 25600,
      bio: "Music Festival Enthusiast | Concert Photographer",
    },
    isLiked: false,
    isSaved: false,
    timestamp: "4 hours ago",
    category: "Music",
    tags: ["music", "festival", "concert", "edm"],
    views: 210000,
    location: "Coachella Valley",
    relatedReels: ["2", "5"],
  },
];

export const monthlyPlans: Plan[] = [
  {
    title: "Basic Plan",
    price: "$4.99",
    features: [
      "2TB additional storage",
      "Up to 1GB file size",
      "Up to 5 projects",
    ],
  },
  {
    title: "Standard Plan",
    price: "$9.99",
    features: [
      "10TB additional storage",
      "Unlimited file size",
      "Up to 10 projects",
    ],
  },
  {
    title: "Premium Plan",
    price: "$19.99",
    features: [
      "Unlimited storage",
      "Unlimited file size",
      "Permanent Membership",
    ],
  },
];

export const yearlyPlans: Plan[] = [
  {
    title: "Basic Plan",
    price: "$49.99",
    features: [
      "2TB additional storage",
      "Up to 1GB file size",
      "Up to 5 projects",
    ],
  },
  {
    title: "Standard Plan",
    price: "$99.99",
    features: [
      "10TB additional storage",
      "Unlimited file size",
      "Up to 10 projects",
    ],
  },
  {
    title: "Premium Plan",
    price: "$199.99",
    features: [
      "Unlimited storage",
      "Unlimited file size",
      "Permanent Membership",
    ],
  },
];

export const images = [
  { src: image_1, title: "Button Badge", category: "Branding" },
  { src: image_5, title: "Bicycle", category: "Illustration" },
  { src: image_8, title: "Creative", category: "Design" },
  { src: image_2, title: "Beer Bottle", height: "200px", category: "Mockup" },
  { src: image_9, title: "Character Art", category: "Artwork" },
  { src: image_3, title: "Wooden Pencils", category: "Stationery" },
  { src: image_6, title: "Free Lancelot", category: "Web" },
  { src: image_10, title: "Packaging", category: "Mockup" },
  { src: image_4, title: "Mountain Logo", category: "Branding" },
  {
    src: image_7,
    title: "Minimal Design",
    height: "200px",
    category: "Branding",
  },
];

export const dummyUsers: ChatUser[] = [
  {
    id: 1,
    name: "Daisy Formanous",
    avatar: "https://i.pravatar.cc/100?img=1",
    messages: [
      {
        text: "Lorem ipsum is simply dummy text.",
        sender: "them",
        time: "09:31",
        seen: false,
      },
    ],
  },
  {
    id: 2,
    name: "Luther Rin",
    avatar: "https://i.pravatar.cc/100?img=2",
    messages: [
      {
        text: "Lorem ipsum is simply dummy text.",
        sender: "them",
        time: "09:28",
        seen: false,
      },
    ],
  },
  {
    id: 3,
    name: "Ram Kumar",
    avatar: "https://i.pravatar.cc/100?img=12",
    messages: [
      {
        text: "Hi.. Prem. How are you doing ?",
        sender: "them",
        time: "09:48",
        seen: false,
      },
      {
        text: "Lorem ipsum is simply dummy text.",
        sender: "me",
        time: "09:49",
      },
    ],
  },
  {
    id: 4,
    name: "Waxy Merto",
    avatar: "https://i.pravatar.cc/100?img=4",
    messages: [],
  },
  {
    id: 5,
    name: "John Hatter",
    avatar: "https://i.pravatar.cc/100?img=5",
    messages: [],
  },
  {
    id: 6,
    name: "Moroy Vijay",
    avatar: "https://i.pravatar.cc/100?img=6",
    messages: [],
  },
  {
    id: 7,
    name: "Vijay",
    avatar: "https://i.pravatar.cc/100?img=7",
    messages: [],
  },
  {
    id: 8,
    name: "Harry",
    avatar: "https://i.pravatar.cc/100?img=8",
    messages: [],
  },
  {
    id: 9,
    name: "Moroy",
    avatar: "https://i.pravatar.cc/100?img=9",
    messages: [],
  },
  {
    id: 10,
    name: "Alex Turner",
    avatar: "https://i.pravatar.cc/100?img=10",
    messages: [],
  },
  {
    id: 11,
    name: "Chris Nolan",
    avatar: "https://i.pravatar.cc/100?img=13",
    messages: [],
  },
  {
    id: 12,
    name: "Sarah Connor",
    avatar: "https://i.pravatar.cc/100?img=14",
    messages: [],
  },
  {
    id: 13,
    name: "Tony Stark",
    avatar: "https://i.pravatar.cc/100?img=15",
    messages: [],
  },
  {
    id: 14,
    name: "Bruce Wayne",
    avatar: "https://i.pravatar.cc/100?img=16",
    messages: [],
  },
];

export const aiOptions = [
  {
    name: "Gemini 3 Pro",
    img: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
  {
    name: "GPT-4",
    img: "https://cdn-icons-png.flaticon.com/512/12222/12222560.png",
  },
  {
    name: "Claude",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  },
  {
    name: "Custom AI",
    img: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
];

export const initialMessages: Messages[] = [
  {
    id: "1",
    sender: "them",
    text: "Hello! 👋",
    time: "09:44 AM",
    avatar: "https://i.pravatar.cc/40?img=32",
  },
  {
    id: "2",
    sender: "me",
    text: "Hello! How can I help you?",
    time: "09:44 AM",
  },
  {
    id: "3",
    sender: "them",
    text: "I have a few questions about cardiology services. Could you help me with that?",
    time: "09:45 AM",
    avatar: "https://i.pravatar.cc/40?img=32",
  },
  {
    id: "4",
    sender: "me",
    text: "Of course, I'd be happy to help. What would you like to know?",
    time: "09:45 AM",
  },
];

export const doctorPlaceholder =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop";
export const patientPlaceholder =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";
