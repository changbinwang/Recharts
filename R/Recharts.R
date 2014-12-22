#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
Recharts <- function(category,data,type,title,subtitle="",interval='auto', width = NULL, height = NULL) {
  # forward options using x
  x = list(
    category = category,
    data = data,
    type = type,
    interval = interval,
    title = title,
    subtitle = subtitle
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'Recharts',
    x,
    width = width,
    height = height,
    package = 'Recharts'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
RechartsOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'Recharts', width, height, package = 'Recharts')
}

#' Widget render function for use in Shiny
#'
#' @export
renderRecharts <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, RechartsOutput, env, quoted = TRUE)
}
