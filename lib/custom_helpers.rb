module CustomHelpers
  def urlize(str)
    str.downcase.gsub(' ', '-')
  end
end
