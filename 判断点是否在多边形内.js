  /**
   * @description 射线法判断点是否在多边形内部
   * @param {Object} point 待判断的点，格式：{ x: X坐标, y: Y坐标 }
   * @param {Array} polygon 多边形顶点，数组成员的格式同 point
   * @return {Boolean} true false
   */
  // 判断点是否在多边形内
  pointInPolygon(targetPoint, targetPoints) {
    var leftPointCount = 0;
    var rightPointCount = 0;//左右点的个数
    var _points = [];
    //第一步：取出所有的点，并计算交点坐标
    for (var i = 0, _length = targetPoints.length - 1; i < _length; i++) {
      var p1 = targetPoints[i], p2 = targetPoints[i + 1];//取出当前点和当前点的下一个点
      var point = this._calcCrossoverPoint(targetPoint, p1, p2);
      //如果交点有效，则保存
      if (point) {
        _points.push(point);
      }
    }
    // 第二步：计算给定的坐标点，左右两边的交点个数，奇数在范围内，偶数则不在
    for (var j = 0, length = _points.length; j < length; j++) {
      var x = _points[j];
      if (x === targetPoint.x) {
        return false;//在线上，直接返回不在范围内
      } else {
        (targetPoint.x !== x && targetPoint.x > x) ? leftPointCount++ : rightPointCount++;
      }
    }
    //判断交点个数
    return (leftPointCount % 2 !== 0 && rightPointCount % 2 !== 0);
  }

  /**
   * 算交点坐标，坐标点在扫描行上或者上方时，交点无效
   * @param targetPoint
   * @param startPoint
   * @param endPoint
   * @returns {*}
   */
  _calcCrossoverPoint(targetPoint, startPoint, endPoint) {
    var crossoverPointX = startPoint.x - ((startPoint.y - targetPoint.y) * (startPoint.x - endPoint.x) / (startPoint.y - endPoint.y));
    //判断交点坐标是否有效，即交点在startPoint，endPoint构成的线段范围内
    if ((startPoint.y < targetPoint.y && endPoint.y >= targetPoint.y) || (endPoint.y < targetPoint.y && startPoint.y >= targetPoint.y)) {
      if ((crossoverPointX >= startPoint.x && crossoverPointX <= endPoint.x) || (crossoverPointX <= startPoint.x && crossoverPointX >= endPoint.x)) {
        return crossoverPointX;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
