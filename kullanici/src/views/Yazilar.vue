<template>
  <div>
    <div class="p-3 col-8 mb-4" id="cardListAppend">
      <div class="card mb-5" v-for="item in list">
        <img class="card-img-top p-3" v-bind:src="item.path" alt="Card image cap" height="350">
        <div class="card-body">
          <a v-bind:href="'/yazilar/'+item.slug"><h5 class="card-title font-weight-bold">{{item.title}}</h5></a>
          <p style="word-wrap: break-word;color:black;">{{item.text}}</p>
        </div>
      </div>

    </div>
    <div class="text-center" v-if="loadingState">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>

</template>

<script>


  export default {
    name: 'Yazilar',
    data: () => ({
      list: "",
      loadingState: false,
      adet: 0

    }),
    beforeMount() {
      this.getAllList()
      $(window).on('scroll', () => {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
          this.adet += 2;
          this.loadingState = true;
          this.getAllList()
        }
      });
      
    },
    methods: {
      getAllList() {
        $.ajax({
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          url: 'http://localhost:1917/api/Articles/GetListInfinitiveScrool/' + this.adet.toString(),
          success: (res, status) => {
            if (this.adet == 0) {
              this.list = res;
            }
            else {
              console.log(res.length)
              setTimeout(() => {
                if (res.length == 0) {
                  $(window).unbind('scroll')
                  this.loadingState = false;
                  $("#cardListAppend").append(`<div class="alert alert-warning" role="alert"> Başka İçerik Kalmadı!</div>`)
                }
                else {
                  
                  res.forEach((item) => {
                    $("#cardListAppend").append(`<div class="card mb-5">
                <img class="card-img-top p-3" src="`+ item.path + `" alt="Card image cap" height="350">
                <div class="card-body">
                <a href="/yazilar/`+ item.slug + `"><h5 class="card-title font-weight-bold">`+ item.title + `</h5></a>
                <p style="word-wrap: break-word;color:black;">`+ item.text + `</p></div></div> `)
                  })
                }
              }, 2000);
            }
          },
          error: function (res, status) {

          },
        })

      },
     

    }

  }
</script>
