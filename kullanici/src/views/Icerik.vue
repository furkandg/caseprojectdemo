<template>
  <div class="p-3">
    <div class="col-8">
      <div class="card">
        <div class="card-header" style="background-color: #27ae60;">
          <h4 class="text-white font-weigh-bold">{{list.title}}</h4>
        </div>
        <div class="card-body">
          <img v-bind:src="list.path" height="360" />
          <p class="card-text" style="word-wrap: break-word;">{{list.text}}</p>
        </div>
      </div>
    </div>
    <div class="col-4">

    </div>
  </div>
 
  <div >
  </div>
</template>

<script>


export default {
  name: 'Icerik',
  data: () => ({
    list:""
    }),
    beforeMount() {
      this.getArticle()
    },
    methods: {
      getArticle() {
          $.ajax({
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:1917/api/Articles/GetBySlug/' + this.$route.params.slug,
            success: (res, status) => {
             
              this.list = res;
            },
            error: function (res, status) {
            
            },
          })
      }

    }

}
</script>
