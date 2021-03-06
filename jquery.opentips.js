﻿//+----------------------------------------------------------------------  
//| 功能：封装常用的alert,confirm,feedback功能.   
//| 说明：基于jQuery,bootstrape对常用的modal操作进行封装,支持函数调用.
//| 参数：
//| 返回值：
//| 创建人：Devin Shen
//| 创建时间：2017-2-8 
//+----------------------------------------------------------------------
$(function () {

    window.DSModal = function () {
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var $obj = $("#ds-modal");

        var feedback_html = "<div class='ds-tips dy-feedback'>" +
                                "<div class='fb-title'>" +
                                    "[Title]" +
                                    "<a class='fb-close' href='javascript:;'>" +
                                        "<i class='icon-l icon-close'></i>" +
                                    "</a>" +
                                "</div>" +
                                "<div class='fb-content'>" +
                                    "<textarea class='dy-textarea' placeholder='[PlaceHolder]'></textarea>" +
                                    "<div class='fb-btn'>" +
                                        "<a class='dy-btn ok' href='javascript:;'>[BtnOk]</a>" +
                                        "<a class='dy-btn cancel' href='javascript:;'>[BtnCancel]</a>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";

        var alert_html = "<div class='ds-tips dy-tips'>" +
                            "<div class='dy-tips-content'>" +
                                "<div class='dy-tips-dialog'>" +
                                    "<div class='dy-tips-body'>" +
                                        "<!--信息提示-->" +
                                        "[Msg]" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>"

        var confirm_html = "<div class='ds-tips dy-modal'>" +
                                "<div class='dy-modal-content'>" +
                                    "<div class='dy-modal-dialog'>" +
                                        "<div class='dy-modal-body'>" +
                                            "<p class='dy-modal-p'>" +
                                                "<!--置中 提示信息-->" +
                                                "[Msg]" +
                                            "</p>" +
                                        "</div>" +
                                        "<div class='dy-modal-footer'>" +
                                            "<a class='btn btn-enter' href='javascript:;'>[BtnOk]</a>" +
                                            "<a class='btn btn-cancel' href='javascript:;'>[BtnCancel]</a>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>"

        /* demo  
        
             //feedback        
             <div class="ds-tips dy-feedback">
                <div class="fb-title">
                    [Title]
                    <a class="fb-close" href="javascript:;">
                        <i class="icon-l icon-close"></i>
                    </a>
                </div>
                <div class="fb-content">
                    <textarea class="dy-textarea" placeholder="[PlaceHolder]"></textarea>
                    <div class="fb-btn">
                        <a class="dy-btn ok" href="javascript:;">[BtnOk]</a>
                        <a class="dy-btn cancel" href="javascript:;">[BtnCancel]</a>
                    </div>
                </div>
            </div>
        
            //alert
            <div class="ds-tips dy-tips">
                <div class="dy-tips-content">
                    <div class="dy-tips-dialog">
                        <div class="dy-tips-body">
                            <!--信息提示-->
                            [Msg]
                        </div>
                    </div>
                </div>
            </div>
        
            //confirm
            <div class="ds-tips dy-modal">
                <div class="dy-modal-content">
                    <div class="dy-modal-dialog">
                        <div class="dy-modal-body">
                            <p class="dy-modal-p">
                                <!--置中 提示信息-->
                                [Msg]
                            </p>
                        </div>
                        <div class="dy-modal-footer">
                            <a class="btn btn-enter" href="javascript:;">[BtnOk]</a>
                            <a class="btn btn-cancel" href="javascript:;">[BtnCancel]</a>
                        </div>
                    </div>
                </div>
            </div>
         */

        var modal_type = {
            alert: 1,
            confirm: 2,
            feedback: 3
        };

        var _alert = function (options) {
            var that = $obj;

            var html = _replace(alert_html, options, modal_type.alert);
            that.html(html);

            that.$tips = that.find(".ds-tips.dy-tips");

            var type = true, time = 2000;
            if (typeof options.type == "boolean") {
                type = options.type;
            }
            if (options.time && typeof options.time == "number") {
                time = options.time;
            }
            
            var closetips = function () {
                that.$tips.removeClass("success false open");
            };

            if (type) {
                that.$tips.removeClass("success false open").addClass("open success");
                if (time > 0) setTimeout(closetips, time);
            }
            else {
                that.$tips.removeClass("success false open").addClass("open false");
                if (time > 0) setTimeout(closetips, time);
            }
        };

        var _confirm = function (options) {
            var that = $obj;

            var html = _replace(confirm_html, options, modal_type.confirm);
            that.html(html);

            that.$confirm = that.find(".ds-tips.dy-modal");
            that.$confirm.$ok = that.$confirm.find(".btn-enter");
            that.$confirm.$cancel = that.$confirm.find(".btn-cancel");

            var closemodal = function () {
                that.$confirm.removeClass("open");
            };

            that.$confirm.removeClass("open").addClass("open");
                            
            return {
                on: function (ok_callback, cancel_callback) {
                    if (ok_callback && ok_callback instanceof Function) {
                        that.$confirm.$ok.on('click', ok_callback);
                    }
                    if (cancel_callback && cancel_callback instanceof Function) {
                        that.$confirm.$cancel.on('click', cancel_callback);
                    }
                    else {
                        that.$confirm.$cancel.on('click', closemodal);
                    }
                }
            };
        };

        var _feedback = function (options) {
            var that = $obj;

            var html = _replace(feedback_html, options, modal_type.feedback);
            that.html(html);

            that.$feedback = that.find(".ds-tips.dy-feedback");
            that.$feedback.$content = that.$feedback.find(".dy-textarea");
            that.$feedback.$ok = that.$feedback.find(".dy-btn.ok");
            that.$feedback.$cancel = that.$feedback.find(".dy-btn.cancel");

            var closefeedback = function () {
                that.$feedback.removeClass("open");
            };
            that.$feedback.find(".fb-close").on('click', closefeedback);
            that.$feedback.removeClass("open").addClass("open");

            return {
                on: function (ok_callback, cancel_callback) {
                    if (ok_callback && ok_callback instanceof Function) {
                        that.$feedback.$ok.on('click', ok_callback);
                    }
                    if (cancel_callback && cancel_callback instanceof Function) {
                        that.$feedback.$cancel.on('click', cancel_callback);
                    }
                    else {
                        that.$feedback.$cancel.on('click', closefeedback);
                    }
                }
            };
        };

        var _replace = function (html, options, type) {

            var ops = {
                msg: "提示内容",
                title: "操作提示",
                btnok: "确定",
                btncl: "取消",
                placeholder: "请填写你的问题，我将尽快进行回复！"
            };

            $.extend(ops, options);

            var new_html = html.replace(reg, function (node, key) {
                return {
                    Title: ops.title,
                    PlaceHolder:ops.placeholder,
                    Msg: ops.msg,
                    BtnOk: ops.btnok,
                    BtnCancel: ops.btncl
                }[key];
            });

            return new_html;
        };

        return {
            alert: _alert,
            confirm: _confirm,
            feedback: _feedback
        }

    }();

});
