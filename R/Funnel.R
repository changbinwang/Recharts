#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
Funnel <- function(legend,value,name,sort,position,poswidth,title,subtitle="",width = NULL, height = NULL) {
  df <- as.data.frame(value)
  names(df) <- name
  # forward options using x
  x = list(
    legend = legend,
    sort = sort,
    value = df,
    title = title,
    subtitle = subtitle,
    name = name,
    position = position,
    width = poswidth
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'Funnel',
    x,
    width = width,
    height = height,
    package = 'Recharts'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
FunnelOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'Funnel', width, height, package = 'Recharts')
}

#' Widget render function for use in Shiny
#'
#' @export
renderFunnel <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, FunnelOutput, env, quoted = TRUE)
}
