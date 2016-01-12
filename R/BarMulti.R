#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
BarMulti <- function(category,data1,data2,names1,names2,yaxis,type="bar",title,subtitle="",interval='auto', avg=T, extremum=T,horizontal=F,smooth=F,width = NULL, height = NULL) {
  # forward options using x
  data1 = as.data.frame(data1)
  data2 = as.data.frame(data2)
  names(data1) <- names1
  names(data2) <- names2
  x = list(
    category = category,
    data1 = data1,
    data2 = data2,
    yaxis = yaxis,
    type = type,
    interval = interval,
    title = title,
    subtitle = subtitle,
    avg = avg,
    extremum = extremum,
    horizontal=horizontal,
    smooth = smooth
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'BarMulti',
    x,
    width = width,
    height = height,
    package = 'Recharts'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
BarMultiOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'BarMulti', width, height, package = 'Recharts')
}

#' Widget render function for use in Shiny
#'
#' @export
renderBarMulti <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, BarMultiOutput, env, quoted = TRUE)
}
