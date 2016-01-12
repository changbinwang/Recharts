#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
Scatter <- function(data_x,data_y,name,xlable,ylable,title,subtitle="", width = NULL, height = NULL) {

  # forward options using x
  x = list(
    data = cbind(data_x,data_y),
    name = name,
    xlable = xlable,
    ylable = ylable,
    title = title,
    subtitle = subtitle
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'Scatter',
    x,
    width = width,
    height = height,
    package = 'Recharts'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
ScatterOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'Scatter', width, height, package = 'Recharts')
}

#' Widget render function for use in Shiny
#'
#' @export
renderScatter <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, ScatterOutput, env, quoted = TRUE)
}
