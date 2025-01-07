<script setup lang="ts">
import PageContainer from "./PageContainer";
import FooterSection from "./FooterSection.vue";
import GLink from "./GLink";
import LogoWithLabel from "~/assets/logo-label.svg?component";
import version from "~/version";
</script>

<template>
  <footer class="mt-8 bg-dark-600">
    <PageContainer class="py-12 lt-sm:mx-5">
      <div
        grid="~ cols-1 sm:cols-2 xl:cols-4"
        class="grid gap-12"
      >
        <FooterSection title="Pages">
          <GLink
            to="/"
            isRouter
            gray
          >
            Home
          </GLink>
        </FooterSection>
        <!-- <FooterSection title="Data Sources">
          <ExternalLink href="https://www.youtube.com">
            youtube
          </ExternalLink>
        </FooterSection>
        <FooterSection title="Images">
          <ExternalLink href="https://www.youtube.com">
            youtube
          </ExternalLink>
        </FooterSection> -->
        <FooterSection title="Other">
          <GLink to="https://github.com/Teamprojekt-Lagersystem/Lagersystem-Frontend">
            Github
          </GLink>
        </FooterSection>
      </div>
      <div className="flex mt-24 items-center">
        <LogoWithLabel class="mr-2" />
        <p className="mr-2 my-0">
          v{{ version }}
        </p>
      </div>
      <!-- <p className="mt-6 text-light-ternary">
        This is a student project. Placeholder.
      </p> -->
    </PageContainer>
  </footer>
</template>
