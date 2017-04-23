<template>
  <div class='landing-inner-page'>
    <article class="landingPageArticle" itemprop="text">
      <h1>{{ $t("landingPage.title") }}</h1>
      <h2>{{ $t("landingPage.text.innerTitle") }}</h2>
      <p v-html="$t('landingPage.text.innerSubTitle')"></p>
      <ol>
        <li  v-for='text in  $t("landingPage.text.rules")' v-html="text"></li>
      </ol>
      <p v-html="$t('landingPage.text.premiseParagraph')"></p>
      <ul>
        <li  v-for='premise in  $t("landingPage.text.premises")' v-html="premise"></li>
      </ul>
    </article>
  </div>
</template>

<script>
import CreateGameModal from './modal/CreateGameModal.vue'

export default {
  name: 'landing-inner-page',
  components: {
    CreateGameModal
  }
}
</script>

<style scoped>
.landingPageArticle {
  text-align: left;
}

.landingPageArticle h1{
  text-align: center;
}

.landingPageArticle ol {
  list-style-type: decimal;
  padding-left: 40px;
}

.landingPageArticle ul {
  list-style-type: circle;
  padding-left: 40px;
}

.landingPageArticle li {
  display: list-item;
}
</style>
