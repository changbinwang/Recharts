#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#' @export
Pie <- function(cate,value,name,title,subtitle="",width = NULL, height = NULL) {
  # forward options using x
  x = list(
    cate = cate,
    value = value,
    name = name,
    title = title,
    subtitle = subtitle
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'Pie',
    x,
    width = width,
    height = height,
    package = 'Recharts'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
PieOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'Pie', width, height, package = 'Recharts')
}

#' Widget render function for use in Shiny
#'
#' @export
renderPie <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, PieOutput, env, quoted = TRUE)
}
