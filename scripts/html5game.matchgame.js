/**
 * Created by ÀîºÀ on 2015/10/28 0028.
 */
var neusoft={};
neusoft.matchingGame={};
neusoft.matchingGame.cardWidth=80;
neusoft.matchingGame.cardHeigth=120;
neusoft.matchingGame.deck=[
    "cardAK","cardAK",
    "cardAQ","cardAQ",
    "cardAJ","cardAJ",
    "cardBK","cardBK",
    "cardBQ","cardBQ",
    "cardBJ","cardBJ"
];
function shuffle(){
    return Math.random()>0.5 ? -1 : 1;
}
$(function(){
    neusoft.matchingGame.deck.sort(shuffle);
  //  alert(neusoft.matchingGame.deck);
});
$(function(){
    neusoft.matchingGame.deck.sort(shuffle);
    var $card =$(".card");
    for(var i=0;i<11;i++){
        $card.clone().appendTo($("#cards"));
    }
    $(".card").each(function(index){
        $(this).css(
            {
                "left":(neusoft.matchingGame.cardWidth+20)*(index%4)+"px",
                "top":(neusoft.matchingGame.cardHeigth+20)*Math.floor(index/4)+"px"
            }
        );
        var pattern=neusoft.matchingGame.deck.pop();
        $(this).data("pattern",pattern);
        $(this).find(".back").addClass(pattern);
        $(this).click(selectCard);
        function selectCard(){
           // alert($(this).data("pattern"));
            if($(".card-flipped").length>1){
                return;
            }
            $(this).addClass("card-flipped");
            var $fcards=$(".card-flipped");
            if($fcards.length==2) {
                setTimeout(function () {
                    checkPattern($fcards);
                }, 700);

            }

        }

        function checkPattern(cards) {
            var pattern1 = $(cards[0]).data("pattern");
            var pattern2 = $(cards[1]).data("pattern");
            //alert(pattern1);
            //alert(pattern2);
            $(cards).removeClass("card-flipped")
            if (pattern1 == pattern2) {
                $(cards).addClass("card-removed").bind("webkitTransitionEnd", function () {
                    $(this).remove();

                });
            }
        }


    })
    });


