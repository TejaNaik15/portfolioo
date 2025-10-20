<div align="center">

# 🚀 Teja Naik - Portfolio Website

### A modern, interactive portfolio showcasing my journey as a MERN Stack Developer

![Portfolio Preview](./public/assets/NAIK.png)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://your-portfolio-url.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/TejaNaik15/portfolioo)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />

### Build Tools & Libraries
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />

### Development Tools
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
<img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code" />

### Deployment
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Interactive UI**
- Smooth animations with GSAP
- Framer Motion transitions
- Custom particle effects
- 3D holographic profile card

### 🌙 **Theme System**
- Dark/Light mode toggle
- Smooth theme transitions
- Persistent theme storage
- System preference detection

</td>
<td width="50%">

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Cross-browser compatibility

### ⚡ **Performance**
- Vite build optimization
- Lazy loading components
- Image optimization
- Smooth scrolling

</td>
</tr>
</table>

---

## 🎯 Portfolio Sections

| Section | Description | Key Features |
|---------|-------------|-------------|
| 🏠 **Home** | Hero section with animated introduction | Typing animation, particle effects, social links |
| 👨💻 **About** | Personal story and background | Animated reveals, interactive profile card |
| 🛠️ **Skills** | Technical expertise showcase | Orbiting skills visualization, interactive icons |
| 💼 **Projects** | Development portfolio | Live demos, GitHub links, tech stack display |
| 🎓 **Education** | Academic journey | Timeline animation, institution details |
| 📞 **Contact** | Get in touch section | Contact form, 3D globe, social media links |

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TejaNaik15/portfolioo.git
   cd portfolioo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📁 Project Architecture

```
portfolioo/
├── 📁 public/
│   ├── 📁 assets/           # Images, icons, media files
│   └── 📄 favicon.svg       # Site favicon
├── 📁 src/
│   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 magicui/      # Magic UI components
│   │   ├── 📄 ProfileCard.jsx
│   │   ├── 📄 OrbitSkills.jsx
│   │   └── 📄 ...
│   ├── 📁 sections/         # Main page sections
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 About.jsx
│   │   ├── 📄 Skills.jsx
│   │   ├── 📄 Projects.jsx
│   │   ├── 📄 Education.jsx
│   │   └── 📄 Contact.jsx
│   ├── 📁 context/          # React Context providers
│   │   ├── 📄 ThemeContext.jsx
│   │   └── 📄 MusicContext.jsx
│   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📄 useScrollOptimization.js
│   │   └── 📄 useScrollReveal.js
│   ├── 📁 styles/           # Global styles and themes
│   │   ├── 📄 theme.css
│   │   ├── 📄 gradient.css
│   │   └── 📄 android-fixes.css
│   ├── 📁 utils/            # Utility functions
│   ├── 📄 App.jsx           # Main App component
│   ├── 📄 main.jsx          # Entry point
│   └── 📄 index.css         # Global styles
├── 📄 package.json          # Dependencies and scripts
├── 📄 vite.config.js        # Vite configuration
├── 📄 tailwind.config.js    # Tailwind CSS config
└── 📄 README.md             # Project documentation
```

---

## 🎨 Key Components

### 🃏 Interactive Profile Card
- **3D Tilt Effects**: Mouse tracking with smooth animations
- **Holographic Background**: Dynamic gradient animations
- **Mobile Support**: Device orientation integration
- **Performance Optimized**: Hardware acceleration enabled

### 🌌 Orbiting Skills
- **Dynamic Visualization**: Rotating skill icons in orbital rings
- **Interactive Hover**: Smooth hover effects and tooltips
- **Responsive Design**: Adapts to all screen sizes
- **Technology Icons**: 20+ technology logos with animations

### 🎭 Animated Navigation
- **Gooey Morphing**: Fluid navigation transitions
- **Particle Effects**: Click animations with particles
- **Smooth Scrolling**: Enhanced scroll-to-section behavior
- **Mobile Optimized**: Touch-friendly navigation

---

## 🌟 Animation System

<div align="center">

| Animation Library | Usage | Features |
|-------------------|-------|----------|
| **GSAP** | Timeline animations, scroll triggers | Professional-grade performance |
| **Framer Motion** | Page transitions, micro-interactions | React-optimized animations |
| **CSS Transforms** | 3D effects, hover states | Hardware-accelerated transforms |
| **Custom Particles** | Background effects, click animations | WebGL-powered particle systems |

</div>

---

## 📱 Device Optimization

### 🖥️ Desktop Experience
- **Rich Interactions**: Full animation suite
- **Smooth Scrolling**: Enhanced navigation
- **Hover Effects**: Interactive element states
- **High Performance**: 60fps animations

### 📱 Mobile Experience
- **Touch Optimized**: Gesture-friendly interface
- **Performance Focused**: Optimized for mobile devices
- **Android Fixes**: Specific optimizations for Android browsers
- **iOS Support**: Native iOS scroll behavior

### 🔧 Cross-Browser Support
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)

---

## 📊 Performance Metrics

<div align="center">

| Metric | Score | Status |
|--------|-------|--------|
| **Performance** | 95+ | 🟢 Excellent |
| **Accessibility** | 100 | 🟢 Perfect |
| **Best Practices** | 100 | 🟢 Perfect |
| **SEO** | 100 | 🟢 Perfect |
| **First Contentful Paint** | < 1.5s | 🟢 Fast |
| **Largest Contentful Paint** | < 2.5s | 🟢 Fast |
| **Cumulative Layout Shift** | < 0.1 | 🟢 Stable |

</div>

---

## 🚀 Deployment

This portfolio is deployed on **Vercel** with:
- ✅ Automatic deployments from main branch
- ✅ Preview deployments for pull requests
- ✅ Custom domain support
- ✅ Edge network optimization
- ✅ Analytics integration

**Live Demo**: [https://portfolioo-two-wheat.vercel.app/](https://portfolioo-two-wheat.vercel.app/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 👨💻 About Me

<div align="center">

<img src="./public/assets/TEJANAIK.png" alt="Teja Naik" width="150" style="border-radius: 50%;" />

### **Keloth Teja Naik**
*MERN Stack Developer | AI & Data Science Student*

🎓 **B.Tech in AI & Data Science** - CMR Institute of Technology, Hyderabad  
💻 **Passionate about** building modern, scalable web applications  
🌟 **Specializing in** React, Node.js, MongoDB, Express.js  

</div>

### 🔗 Connect with Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/teja-naik-0b3021282)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TejaNaik15)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/TEJA_NAIKK)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/eren_yeager9_)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tinkuteja740@gmail.com)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the incredible React library
- **Vercel** - For seamless deployment platform
- **Tailwind CSS** - For the utility-first CSS framework
- **GSAP** - For professional animation capabilities
- **Framer Motion** - For smooth React animations
- **Open Source Community** - For amazing tools and inspiration

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by [Teja Naik](https://github.com/TejaNaik15)**

*"Building the future, one line of code at a time."*

</div>
