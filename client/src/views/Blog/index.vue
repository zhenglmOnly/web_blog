<template>
    <div class="Blog">
        <Nav></Nav>
        <Container></Container>
    </div>
</template>

<script>
    import Nav from "../../components/Nav.vue";
    import Container from "../../components/Container.vue";
    export default {
        name: "Blog",
        components:{
            Nav,
            Container,
        }
    }
</script>

<style scoped>

</style>