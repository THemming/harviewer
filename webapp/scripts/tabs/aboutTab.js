/* See license.txt for terms of usage */

/**
 * @module tabs/aboutTab
 */
define("tabs/aboutTab", [
    "domplate/domplate",
    "domplate/tabView",
    "core/lib",
    "i18n!nls/harViewer"
],

function(Domplate, TabView, Lib, Strings) { with (Domplate) {

//*************************************************************************************************
// Home Tab

/**
 * @constructor module:tabs/aboutTab
 */
function AboutTab() {}
AboutTab.prototype =
{
    id: "About",
    label: Strings.aboutTabLabel,

    tabHeaderTag:
        A({"class": "$tab.id\\Tab tab", view: "$tab.id", _repObject: "$tab"},
            "$tab.label"
        ),

    bodyTag:
        DIV({"class": "aboutBody"}),

    onUpdateBody: function(tabView, body)
    {
        var self = this;
        body = this.bodyTag.replace({}, body);
        require(["text!tabs/aboutTab.html"], function(html)
        {
            html = html.replace("@VERSION@", tabView.version, "g");
            html = html.replace("http://www.softwareishard.com/blog/har-12-spec/", tabView.harSpecURL, "g");
            body.innerHTML = html;

            $(".linkSchema").click(Lib.bind(self.onSchema, self));
        });
    },

    onSchema: function()
    {
        this.tabView.selectTabByName("Schema");
    }
};

return AboutTab;

//*************************************************************************************************
}});
