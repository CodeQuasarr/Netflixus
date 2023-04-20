<template>
    <div class="netflixus-logo">
        <div class="netflixus-logo-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h1 class="netflixus-logo-name">Netflixus</h1>
    </div>
</template>

<script>
export default {
    name: "TheIntro"
}
</script>

<style scoped>
.netflixus-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
}
.netflixus-logo-icon{
    position: relative;
    width: 340px;
    height: 510px;
    overflow: hidden;
    transform: scale(.8);

}
.netflixus-logo-icon:before{
    content: '';
    position: absolute;
    bottom:0;
    left: 0;
    background: #000;
    width: 100%;
    height: 120px;
    z-index: 2;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
    transform: scaleX(1.5);
}

.netflixus-logo-icon:after, h3:before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(to right, transparent, #000, #000);
    width: 400%;
    height: 100%;
    z-index: 3;
    animation: animate 2s linear forwards;
}
@keyframes animate{
    0%{
        right: 0;
    }
    100%{
        right: -400%;
    }
}
.netflixus-logo-icon span {
    position: absolute;
    width: 100px;
    height: 80%;
    background: #fff;
    top: 0;
}

.netflixus-logo-icon span:nth-child(1) {

    background: #b00612;
    left: 0;

}
.netflixus-logo-icon span:nth-child(2) {

    background: #e50815;
    left: 0;
    z-index: 1;
    transform-origin: top left;
    transform: skewX(30deg);
    box-shadow: 0 0 40px rgba(0, 0, 0, 1);
}

.netflixus-logo-icon span:nth-child(3) {
    background: #b00612;
    right: 0;
}


.netflixus-logo-name{
    position: relative;
    font-weight: bold;
    text-align: center;
    font-family: arial, monospace;
    letter-spacing: 15px;
    font-size: 55px;
    text-transform: uppercase;
    transform: translateY(-8rem);
    overflow: hidden;
}
</style>
