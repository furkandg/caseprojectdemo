#pragma checksum "C:\Users\Mekansal Bulut\Desktop\case\CaseProject\Web\Views\Category\Ekle.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a6a43b2741727b0f303e9e922523eeb0b24a04e2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Category_Ekle), @"mvc.1.0.view", @"/Views/Category/Ekle.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Mekansal Bulut\Desktop\case\CaseProject\Web\Views\_ViewImports.cshtml"
using Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Mekansal Bulut\Desktop\case\CaseProject\Web\Views\_ViewImports.cshtml"
using Model;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\Mekansal Bulut\Desktop\case\CaseProject\Web\Views\_ViewImports.cshtml"
using Model.DtoModel;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\Mekansal Bulut\Desktop\case\CaseProject\Web\Views\_ViewImports.cshtml"
using Model.ViewModel;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a6a43b2741727b0f303e9e922523eeb0b24a04e2", @"/Views/Category/Ekle.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a86823306d1de1d2fc60fadcd67335ff3130f8ea", @"/Views/_ViewImports.cshtml")]
    public class Views_Category_Ekle : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"
<div class=""col-sm-12"" id=""categoryAddPanel"">

    <div class=""alert alert-success alert-dismissible"" role=""alert"" v-if=""state.condition == true"">
        <button type=""button"" class=""close"" data-dismiss=""alert"" aria-label=""Close""><span aria-hidden=""true"">×</span></button>
        {{state.message}}
    </div>

    <div class=""alert alert-danger alert-dismissible"" role=""alert"" v-if=""state.condition== false"">
        <button type=""button"" class=""close"" data-dismiss=""alert"" aria-label=""Close""><span aria-hidden=""true"">×</span></button>
        Oh snap! Change a few things up and try submitting again.
    </div>
    <div class=""card"">
        <div class=""card-header ch-alt m-b-20"">
            <h2>Kategori İşlemleri <small>Kategori Ekle</small></h2>
            <ul class=""actions"">
                <li>
                    <a href=""#"">
                        <i class=""zmdi zmdi-refresh-alt""></i>
                    </a>
                </li>
                <li>
                    <a href=""");
            WriteLiteral(@"#"">
                        <i class=""zmdi zmdi-download""></i>
                    </a>
                </li>
                <li class=""dropdown"">
                    <a href=""#"" data-toggle=""dropdown"">
                        <i class=""zmdi zmdi-more-vert""></i>
                    </a>

                    <ul class=""dropdown-menu dropdown-menu-right"">
                        <li>
                            <a href=""#"">Change Date Range</a>
                        </li>
                        <li>
                            <a href=""#"">Change Graph Type</a>
                        </li>
                        <li>
                            <a href=""#"">Other Settings</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <a href=""/Category/Index"" class=""btn bgm-green btn-float waves-effect""><i class=""zmdi zmdi-apps""></i></a>
        </div>

        <div class=""card-body card-padding"">
            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "a6a43b2741727b0f303e9e922523eeb0b24a04e25698", async() => {
                WriteLiteral(@"
                <div class=""input-group"">
                    <span class=""input-group-addon""><i class=""zmdi zmdi-layers""></i></span>
                    <div class=""fg-line"">
                        <input type=""text"" class=""form-control"" placeholder=""Ad"" name=""ad"" v-model=""categorydata.ad"">

                    </div>
                </div>
                <div class=""input-group mt-3"">
                    <span class=""input-group-addon""><i class=""zmdi zmdi-collection-text""></i></span>
                    <div class=""fg-line"">
                        <textarea class=""form-control"" rows=""4"" placeholder=""Açıklama"" name=""aciklama"" v-model=""categorydata.aciklama""></textarea>
                    </div>
                </div>
            ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            <button class=""btn btn-success btn-sm m-t-10"" style=""margin-left:15px;"" v-on:click=""categoryAdd()""> Ekle</button>



        </div>


    </div>
</div>
<script>

    new Vue({
        el: ""#categoryAddPanel"",
        data: {
            state: {
                condition: null,
                message: """"

            },
            categorydata: {
                ""ad"": """",
                ""aciklama"":""""

            }
        },
        beforeCreate() {
            if (!localStorage.getItem(""localToken"")) {
                window.location.href = ""/login/index"";
            }
        },
        methods: {
            categoryAdd() {

                Object.assign(this.$data, this.$options.data());
          
                $.ajax({
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Authorization': 'bearer ' + localStorage.getItem(""localToken"")
   ");
            WriteLiteral(@"                 },
                    type: 'POST',
                    data: JSON.stringify(this.categorydata),
                    url: 'http://localhost:1917/api/Category/Add',
                    success: (res, status) => {
                        Object.assign(this.$data, this.$options.data());
                    },
                    error: (res, status) =>{
                        this.state.condition = true;
                        this.state.message = ""Ekleme İşlemi Başarılı"";
                        setTimeout( () =>{ this.state.condition=null; }, 1000);
                        //Object.assign(this.$data, this.$options.data());
                      
                    },
                })
            }
        }
    })
</script>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591