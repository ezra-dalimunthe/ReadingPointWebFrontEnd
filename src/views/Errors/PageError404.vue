<template>
  <div class="container" style="height: 60vh">
    <div class="row align-items-center h-100">
      <div class="col-8 mx-auto">
        <b-card
          no-body
          img-src="https://images.unsplash.com/photo-1516027828283-84217f09f3c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FkJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=200&q=60"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <div class="d-flex flex-column flex-fill">
            <b-card-header
              header="404 NOT FOUND"
              header-bg-variant="gradient-right-danger"
              header-text-variant="white"
            ></b-card-header>
            <b-card-body>
              <b-card-text
                >The page you're looking for is not there.</b-card-text
              >
           
            </b-card-body>
            <b-card-footer class="d-flex justify-content-end">
              <b-card-text
                >Back to
                <b-link :to="{ name: 'home' }">Home</b-link></b-card-text
              >
            </b-card-footer>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageError404",
 
};
</script>
<style>
.page-errors {
  text-align: center;
}
</style>
