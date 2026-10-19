document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // LOADING SCREEN
    // =========================================

    const loadingScreen =
        document.getElementById("loadingScreen");


    setTimeout(function () {

        if (loadingScreen) {

            loadingScreen.classList.add(
                "hide"
            );

        }

    }, 1800);


    // =========================================
    // CURSOR GLOW
    // =========================================

    const cursorGlow =
        document.getElementById("cursorGlow");


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX = event.clientX;
            mouseY = event.clientY;


            if (cursorGlow) {

                cursorGlow.style.opacity =
                    "1";

            }

        }
    );


    function moveGlow() {

        glowX +=
            (mouseX - glowX) * 0.12;

        glowY +=
            (mouseY - glowY) * 0.12;


        if (cursorGlow) {

            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";

        }


        requestAnimationFrame(
            moveGlow
        );

    }


    moveGlow();


    // =========================================
    // DARK / LIGHT MODE
    // =========================================

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const themeIcon =
        document.getElementById(
            "themeIcon"
        );

    const themeText =
        document.getElementById(
            "themeText"
        );


    const savedTheme =
        localStorage.getItem(
            "marnelliTheme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );


        themeIcon.textContent =
            "🌙";

        themeText.textContent =
            "Dark Mode";

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light-mode"
                );


                const lightMode =
                    document.body
                        .classList
                        .contains(
                            "light-mode"
                        );


                if (lightMode) {

                    themeIcon.textContent =
                        "🌙";

                    themeText.textContent =
                        "Dark Mode";


                    localStorage.setItem(
                        "marnelliTheme",
                        "light"
                    );

                }

                else {

                    themeIcon.textContent =
                        "☀";

                    themeText.textContent =
                        "Light Mode";


                    localStorage.setItem(
                        "marnelliTheme",
                        "dark"
                    );

                }

            }
        );

    }


    // =========================================
    // TYPING ANIMATION
    // =========================================

    const typingText =
        document.getElementById(
            "typingText"
        );


    const words = [

        "Information Technology Student",

        "Technology Learner",

        "Adventure Enthusiast"

    ];


    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;


    function typingAnimation() {

        if (!typingText) {
            return;
        }


        const currentWord =
            words[wordIndex];


        if (!deleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    letterIndex + 1
                );


            letterIndex++;


            if (
                letterIndex ===
                currentWord.length
            ) {

                deleting = true;


                setTimeout(
                    typingAnimation,
                    1500
                );


                return;

            }

        }

        else {

            typingText.textContent =
                currentWord.substring(
                    0,
                    letterIndex - 1
                );


            letterIndex--;


            if (letterIndex === 0) {

                deleting = false;


                wordIndex =
                    (
                        wordIndex + 1
                    ) %
                    words.length;

            }

        }


        setTimeout(
            typingAnimation,
            deleting ? 45 : 80
        );

    }


    typingAnimation();


    // =========================================
    // PROFILE IMAGE SWITCHER
    // =========================================

    const mainProfile =
        document.getElementById(
            "mainProfile"
        );

    const sidebarProfile =
        document.getElementById(
            "sidebarProfile"
        );

    const photoButtons =
        document.querySelectorAll(
            ".photo-thumb"
        );


    photoButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const newImage =
                        this.dataset.image;


                    if (!newImage) {
                        return;
                    }


                    mainProfile.style.opacity =
                        "0";


                    setTimeout(
                        function () {

                            mainProfile.src =
                                newImage;


                            mainProfile.style.opacity =
                                "1";

                        },
                        150
                    );


                    photoButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    // =========================================
    // SMOOTH SCROLL
    // =========================================

    const pageLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    pageLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                }
            );

        }
    );


    // =========================================
    // ACTIVE SIDEBAR LINK
    // =========================================

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".side-nav a"
        );


    function updateNavigation() {

        let current =
            "home";


        sections.forEach(
            function (section) {

                const top =
                    section.offsetTop -
                    150;


                if (
                    window.scrollY >= top
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active-link"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active-link"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateNavigation
    );


    updateNavigation();


    // =========================================
    // REVEAL ANIMATION
    // =========================================

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.1
                }

            );


        revealElements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    // =========================================
    // BACK TO TOP
    // =========================================

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    function updateBackButton() {

        if (!backToTop) {
            return;
        }


        backToTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }


    window.addEventListener(
        "scroll",
        updateBackButton
    );


    updateBackButton();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    // =========================================
    // MARNELLI ASSIST
    // =========================================

    const chatToggle =
        document.getElementById(
            "chatToggle"
        );

    const chatWidget =
        document.getElementById(
            "chatWidget"
        );

    const chatClose =
        document.getElementById(
            "chatClose"
        );

    const chatForm =
        document.getElementById(
            "chatForm"
        );

    const chatInput =
        document.getElementById(
            "chatInput"
        );

    const chatMessages =
        document.getElementById(
            "chatMessages"
        );

    const quickButtons =
        document.querySelectorAll(
            ".quick-btn"
        );


    // OPEN
    if (
        chatToggle &&
        chatWidget
    ) {

        chatToggle.addEventListener(
            "click",
            function () {

                chatWidget.classList.toggle(
                    "open"
                );


                if (
                    chatWidget.classList
                        .contains("open") &&
                    chatInput
                ) {

                    setTimeout(
                        function () {

                            chatInput.focus();

                        },
                        100
                    );

                }

            }
        );

    }


    // CLOSE
    if (
        chatClose &&
        chatWidget
    ) {

        chatClose.addEventListener(
            "click",
            function () {

                chatWidget.classList.remove(
                    "open"
                );

            }
        );

    }


    // QUICK BUTTONS
    quickButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        this.dataset.question;


                    if (question) {

                        sendChatMessage(
                            question
                        );

                    }

                }
            );

        }
    );


    // SEND FORM
    if (
        chatForm &&
        chatInput
    ) {

        chatForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const text =
                    chatInput.value.trim();


                if (!text) {
                    return;
                }


                chatInput.value =
                    "";


                sendChatMessage(
                    text
                );

            }
        );

    }


    function sendChatMessage(
        message
    ) {

        addChatMessage(
            message,
            "user-message"
        );


        setTimeout(
            function () {

                addChatMessage(
                    getMarnelliReply(
                        message
                    ),
                    "bot-message"
                );

            },
            400
        );

    }


    function addChatMessage(
        message,
        className
    ) {

        if (!chatMessages) {
            return;
        }


        const element =
            document.createElement(
                "div"
            );


        element.className =
            className;


        element.textContent =
            message;


        chatMessages.appendChild(
            element
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    // =========================================
    // CHATBOT RESPONSES
    // =========================================

    function getMarnelliReply(
        message
    ) {

        const text =
            message.toLowerCase();


        if (
            text.includes("hi") ||
            text.includes("hello") ||
            text.includes("hey")
        ) {

            return "Hello! I'm Marnelli's portfolio assistant. Ask me about her course, school, year level, hobbies, or contact information.";

        }


        if (
            text.includes("name") ||
            text.includes(
                "who is marnelli"
            )
        ) {

            return "Her name is Marnelli C. Paz. She is a Bachelor of Science in Information Technology student.";

        }


        if (
            text.includes("course") ||
            text.includes("degree") ||
            text.includes("program")
        ) {

            return "Marnelli is taking Bachelor of Science in Information Technology.";

        }


        if (
            text.includes("school") ||
            text.includes("university")
        ) {

            return "Marnelli studies at Philippine Christian University.";

        }


        if (
            text.includes("year")
        ) {

            return "Marnelli is currently a 3rd year college student.";

        }


        if (
            text.includes("hobby") ||
            text.includes("hobbies")
        ) {

            return "Marnelli enjoys riding a motorcycle and traveling.";

        }


        if (
            text.includes("motorcycle") ||
            text.includes("riding") ||
            text.includes("ride")
        ) {

            return "Marnelli enjoys riding a motorcycle during her free time and experiencing the freedom of being on the road.";

        }


        if (
            text.includes("travel") ||
            text.includes("trip")
        ) {

            return "Marnelli enjoys traveling, discovering new places, and creating memorable experiences.";

        }


        if (
            text.includes("email")
        ) {

            return "Marnelli's email is marnelli.paz.coi@pcu.edu.ph.";

        }


        if (
            text.includes("phone") ||
            text.includes("number") ||
            text.includes("contact")
        ) {

            return "You can contact Marnelli at 09397942423 or through marnelli.paz.coi@pcu.edu.ph.";

        }


        if (
            text.includes("thank")
        ) {

            return "You're welcome! Feel free to ask me another question about Marnelli.";

        }


        return "You can ask me about Marnelli's course, school, year level, motorcycle hobby, travel, email, or phone number.";

    }

});