<template>
    <div>
        <slot name="one" :age="age" userName="xixi"></slot>
			<子组件中My>
        <slot name="two"></slot>
		<slot></slot>
    </div>
</template>

<script>
    export default {
        name: "My",
        data(){
            return {
                age:12
            }
        }
    }
</script>

<style scoped>

</style>